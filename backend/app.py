from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_mail import Mail, Message
from models import db, bcrypt, User, Blog, Review, ContactMessage
from datetime import timedelta, datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Email Configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', '587'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL', 'False').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Your email
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Your app password
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', os.getenv('MAIL_USERNAME'))

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
mail = Mail(app)

# Create tables
with app.app_context():
    db.create_all()

# In-memory store for view tracking (use Redis in production)
recent_views = {}

def clean_old_views():
    """Clean views older than 1 hour"""
    current_time = datetime.now()
    keys_to_remove = []
    
    for key, timestamp in recent_views.items():
        if (current_time - timestamp).total_seconds() > 3600:  # 1 hour
            keys_to_remove.append(key)
    
    for key in keys_to_remove:
        del recent_views[key]

def has_viewed_recently(blog_id, user_ip):
    """Check if IP has viewed this blog in the last hour"""
    clean_old_views()
    view_key = f"{blog_id}_{user_ip}"
    return view_key in recent_views

def record_view(blog_id, user_ip):
    """Record a view for this blog and IP"""
    view_key = f"{blog_id}_{user_ip}"
    recent_views[view_key] = datetime.now()

def send_contact_email(name, email, subject, message):
    """Send email notification for contact form submissions"""
    try:
        # Create email message
        msg = Message(
            subject=f"BlogSphere Contact: {subject}",
            recipients=['jatinsrivastava4104@gmail.com'],
            reply_to=email
        )
        
        # Email body
        msg.html = f"""
        <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #9333ea, #3b82f6); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h2 style="color: white; margin: 0; text-align: center;">New Contact Message - BlogSphere</h2>
                </div>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #9333ea;">
                    <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Subject:</strong> {subject}</p>
                </div>
                
                <div style="background: #ffffff; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid #e2e8f0;">
                    <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
                    <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; border-left: 3px solid #3b82f6;">
                        {message.replace(chr(10), '<br>')}
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 10px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0; color: #92400e;">
                        <strong>📧 Reply Instructions:</strong><br>
                        You can reply directly to this email to respond to {name}.<br>
                        Their email ({email}) is set as the reply-to address.
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 10px;">
                    <p style="color: #64748b; margin: 0; font-size: 14px;">
                        This message was sent from BlogSphere Contact Form<br>
                        Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
                    </p>
                </div>
            </body>
        </html>
        """
        
        # Send email
        mail.send(msg)
        return True
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

def send_confirmation_email(name, email):
    """Send confirmation email to the person who submitted the contact form"""
    try:
        msg = Message(
            subject="Thank you for contacting BlogSphere!",
            recipients=[email]
        )
        
        msg.html = f"""
        <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #9333ea, #3b82f6); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h2 style="color: white; margin: 0; text-align: center;">Thank You for Contacting Us!</h2>
                </div>
                
                <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
                    <h3 style="color: #1e293b;">Hi {name},</h3>
                    
                    <p style="color: #475569; line-height: 1.6;">
                        Thank you for reaching out to BlogSphere! We've received your message and appreciate you taking the time to contact us.
                    </p>
                    
                    <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                        <p style="margin: 0; color: #1e40af;">
                            <strong>⏰ What's Next?</strong><br>
                            We typically respond within 24 hours during business days. You'll hear back from us soon!
                        </p>
                    </div>
                    
                    <p style="color: #475569; line-height: 1.6;">
                        In the meantime, feel free to:
                    </p>
                    
                    <ul style="color: #475569; line-height: 1.6;">
                        <li>📖 Browse our latest blog posts</li>
                        <li>🤝 Connect with us on social media</li>
                        <li>📝 Join our community of writers</li>
                    </ul>
                    
                    <p style="color: #475569; line-height: 1.6;">
                        Thanks again for your interest in BlogSphere!
                    </p>
                    
                    <p style="color: #475569; line-height: 1.6;">
                        Best regards,<br>
                        <strong>The BlogSphere Team</strong>
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 10px;">
                    <p style="color: #64748b; margin: 0; font-size: 14px;">
                        This is an automated confirmation email from BlogSphere<br>
                        Please do not reply to this email
                    </p>
                </div>
            </body>
        </html>
        """
        
        mail.send(msg)
        return True
        
    except Exception as e:
        print(f"Error sending confirmation email: {str(e)}")
        return False

# Routes
@app.route('/')
def home():
    return jsonify({ "message": "Blog API" })

# Auth Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({ "message": "Missing required fields" }), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({ "message": "Username already exists" }), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({ "message": "Email already exists"}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email
        }
    }), 201

@app.route('/login', methods=['POST'])
def login():
    print("=== LOGIN ATTEMPT ===")
    print(f"Request method: {request.method}")
    print(f"Request headers: {dict(request.headers)}")
    print(f"Request data: {request.get_json()}")
    
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    print(f"Extracted username: '{username}'")
    print(f"Extracted password: '{password}'")
    
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400
    
    user = User.query.filter_by(username=username).first()
    print(f"User found: {user is not None}")
    
    if user:
        print(f"User ID: {user.id}")
        print(f"Stored password hash: {user.password}")
        password_check = bcrypt.check_password_hash(user.password, password)
        print(f"Password check result: {password_check}")
    
    if not user or not bcrypt.check_password_hash(user.password, password):
        print("LOGIN FAILED: Invalid credentials")
        return jsonify({"message": "Invalid credentials"}), 401
    
    print("LOGIN SUCCESS")
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200

# Blog Routes
@app.route('/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.order_by(Blog.created_at.desc()).all()
    blogs_data = []
    for blog in blogs:
        blog_data = {
            "id": blog.id,
            "title": blog.title,
            "content": blog.content,
            "created_at": blog.created_at.isoformat(),
            "views": blog.views,
            "likes": blog.likes,
            "author": blog.author.username,
            "author_id": blog.user_id,
            "review_count": len(blog.reviews)
        }
        blogs_data.append(blog_data)
    return jsonify(blogs_data), 200

@app.route('/blogs/<int:blog_id>', methods=['GET'])
def get_blog(blog_id):
    """Get blog data WITHOUT incrementing views"""
    blog = Blog.query.get_or_404(blog_id)
    
    # DO NOT increment views here - that's handled by the separate endpoint
    
    reviews = []
    for review in blog.reviews:
        reviews.append({
            "id": review.id,
            "content": review.content,
            "created_at": review.created_at.isoformat(),
            "reviewer": review.reviewer.username
        })
    
    return jsonify({
        "id": blog.id,
        "title": blog.title,
        "content": blog.content,
        "created_at": blog.created_at.isoformat(),
        "views": blog.views,
        "likes": blog.likes,
        "author": blog.author.username,
        "author_id": blog.user_id,
        "reviews": reviews
    }), 200

@app.route('/blogs/<int:blog_id>/view', methods=['POST'])
def increment_blog_view(blog_id):
    """Separate endpoint to increment blog views with IP-based tracking"""
    blog = Blog.query.get_or_404(blog_id)
    
    # Get user's IP address
    user_ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    
    # Check if this IP has viewed this blog recently
    if not has_viewed_recently(blog_id, user_ip):
        # Increment view count
        blog.views += 1
        db.session.commit()
        
        # Record this view
        record_view(blog_id, user_ip)
        
        return jsonify({
            "message": "View counted",
            "views": blog.views
        }), 200
    else:
        # View already counted recently for this IP
        return jsonify({
            "message": "View already counted recently",
            "views": blog.views
        }), 200

@app.route('/blogs', methods=['POST'])
@jwt_required()
def create_blog():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data.get('title') or not data.get('content'):
        return jsonify({"error": "Title and content are required"}), 400
    
    new_blog = Blog(
        title=data['title'],
        content=data['content'],
        user_id=current_user_id
    )
    db.session.add(new_blog)
    db.session.commit()
    
    return jsonify({"message": "Blog created successfully", "id": new_blog.id}), 201

@app.route('/blogs/<int:blog_id>/like', methods=['POST'])
@jwt_required()
def like_blog(blog_id):
    blog = Blog.query.get_or_404(blog_id)
    blog.likes += 1
    db.session.commit()
    return jsonify({"message": "Blog liked", "likes": blog.likes}), 200

# Review Routes
@app.route('/blogs/<int:blog_id>/reviews', methods=['POST'])
@jwt_required()
def create_review(blog_id):
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data.get('content'):
        return jsonify({"error": "Content is required"}), 400
    
    new_review = Review(
        content=data['content'],
        user_id=current_user_id,
        blog_id=blog_id
    )
    db.session.add(new_review)
    db.session.commit()
    
    return jsonify({"message": "Review added successfully"}), 201

# Contact Message Routes
@app.route('/contact', methods=['POST'])
def submit_contact_message():
    """Submit a new contact message and send email"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'email', 'subject', 'message']
    if not all(field in data and data[field].strip() for field in required_fields):
        return jsonify({"error": "All fields are required"}), 400
    
    # Basic email validation
    if '@' not in data['email'] or '.' not in data['email']:
        return jsonify({"error": "Invalid email format"}), 400
    
    # Extract data
    name = data['name'].strip()
    email = data['email'].strip()
    subject = data['subject'].strip()
    message = data['message'].strip()
    
    # Create new contact message
    new_message = ContactMessage(
        name=name,
        email=email,
        subject=subject,
        message=message
    )
    
    try:
        # Save to database
        db.session.add(new_message)
        db.session.commit()
        
        # Send email notifications
        email_sent = send_contact_email(name, email, subject, message)
        confirmation_sent = send_confirmation_email(name, email)
        
        if email_sent:
            return jsonify({
                "message": "Message sent successfully! We'll get back to you within 24 hours.",
                "id": new_message.id,
                "email_sent": True,
                "confirmation_sent": confirmation_sent
            }), 201
        else:
            return jsonify({
                "message": "Message saved but email notification failed. We'll still get back to you!",
                "id": new_message.id,
                "email_sent": False,
                "confirmation_sent": confirmation_sent
            }), 201
            
    except Exception as e:
        db.session.rollback()
        print(f"Error in contact submission: {str(e)}")
        return jsonify({"error": "Failed to send message. Please try again."}), 500

@app.route('/contact/messages', methods=['GET'])
@jwt_required()
def get_contact_messages():
    """Get all contact messages (admin only - you can add admin check later)"""
    current_user_id = get_jwt_identity()

    # Optional: Add admin check here
    # user = User.query.get(current_user_id)
    # if not user.is_admin:
    #     return jsonify({"error": "Unauthorized"}), 403
    
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    messages_data = []
    
    for message in messages:
        messages_data.append({
            "id": message.id,
            "name": message.name,
            "email": message.email,
            "subject": message.subject,
            "message": message.message,
            "created_at": message.created_at.isoformat(),
            "is_read": message.is_read
        })
    
    return jsonify(messages_data), 200

@app.route('/contact/messages/<int:message_id>', methods=['GET'])
@jwt_required()
def get_contact_message(message_id):
    """Get a specific contact message"""
    current_user_id = get_jwt_identity()
    
    message = ContactMessage.query.get_or_404(message_id)
    
    return jsonify({
        "id": message.id,
        "name": message.name,
        "email": message.email,
        "subject": message.subject,
        "message": message.message,
        "created_at": message.created_at.isoformat(),
        "is_read": message.is_read
    }), 200

@app.route('/contact/messages/<int:message_id>/read', methods=['PUT'])
@jwt_required()
def mark_message_as_read(message_id):
    """Mark a contact message as read"""
    current_user_id = get_jwt_identity()
    
    message = ContactMessage.query.get_or_404(message_id)
    message.is_read = True
    db.session.commit()
    
    return jsonify({"message": "Message marked as read"}), 200

if __name__ == '__main__':
    app.run(debug=True)