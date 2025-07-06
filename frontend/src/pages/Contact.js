import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Globe,
  Github,
  Linkedin,
  Heart,
} from "lucide-react";

const Contact = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        // Handle error
        console.error("Error:", data.error);
        alert(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "jatinsrivastava4104@gmail.com",
      description: "Send us an email anytime!",
      link: "mailto:jatinsrivastava4104@gmail.com"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Website",
      value: "https://github.com/JxTIN21",
      description: "Visit our main website",
      link: "https://github.com/JxTIN21"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      value: "Within 24 hours",
      description: "We'll get back to you quickly",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Community",
      value: "Join our Discord",
      description: "Connect with other writers",
      link: "https://discord.gg/bgbJZvFw",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      name: "GitHub",
      url: "https://github.com/JxTIN21",
      color: "hover:text-gray-300",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jatin-srivastava-784223253/",
      color: "hover:text-blue-400",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      name: "Email",
      url: "mailto:jatinsrivastava4104@gmail.com",
      color: "hover:text-purple-400",
    },
  ];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
            50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .page-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            position: relative;
            overflow-x: hidden;
          }
          
          .page-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
            pointer-events: none;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.3s ease;
          }
          
          .glass-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(147, 51, 234, 0.3);
            transform: translateY(-5px);
          }
          
          .contact-info-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.5rem;
            transition: all 0.3s ease;
          }
          
          .contact-info-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(147, 51, 234, 0.3);
            transform: translateY(-3px);
          }
          
          .form-input {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1rem;
            color: white;
            transition: all 0.3s ease;
          }
          
          .form-input:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(147, 51, 234, 0.5);
            outline: none;
            box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
          }
          
          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }
          
          .submit-btn {
            background: linear-gradient(135deg, #9333ea, #3b82f6);
            border: none;
            border-radius: 12px;
            padding: 1rem 2rem;
            color: white;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(147, 51, 234, 0.3);
          }
          
          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          .submit-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }
          
          .submit-btn:hover::before {
            left: 100%;
          }
          
          .floating-element {
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #9333ea, #3b82f6);
            border-radius: 50%;
            opacity: 0.4;
            animation: float 5s ease-in-out infinite;
          }
          
          .social-link {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            color: #9ca3af;
          }
          
          .social-link:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-3px);
            animation: pulse-glow 2s infinite;
          }
          
          .success-message {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 12px;
            padding: 1rem;
            color: #10b981;
            text-align: center;
            animation: pulse-glow 2s infinite;
          }
        `,
        }}
      />

      <div className="page-container">
        {/* Floating Elements */}
        <div
          className="floating-element"
          style={{ top: "15%", left: "8%", animationDelay: "0s" }}
        ></div>
        <div
          className="floating-element"
          style={{ top: "25%", right: "12%", animationDelay: "2s" }}
        ></div>
        <div
          className="floating-element"
          style={{ bottom: "35%", left: "18%", animationDelay: "4s" }}
        ></div>
        <div
          className="floating-element"
          style={{ bottom: "20%", right: "10%", animationDelay: "1s" }}
        ></div>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center justify-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <MessageCircle className="w-12 h-12 text-purple-400 mr-4" />
                <h1 className="text-5xl font-bold gradient-text">
                  Get In Touch
                </h1>
              </motion.div>

              <motion.p
                className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Have a question, suggestion, or just want to say hello? We'd
                love to hear from you. Drop us a message and we'll get back to
                you as soon as possible.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="contact-info-card text-center"
                >
                  <motion.div
                    className="text-purple-400 mb-4 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {info.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 font-medium mb-2 hover:text-purple-200 transition-colors cursor-pointer"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-purple-300 font-medium mb-2">
                      {info.value}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Social Links */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold gradient-text mb-6">
                    Send Us a Message
                  </h2>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="success-message mb-6"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <Heart className="w-5 h-5 mr-2" />
                        <span className="font-semibold">
                          Thank you for your message!
                        </span>
                      </div>
                      <p>
                        We've received your message and will get back to you
                        within 24 hours.
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <label className="block text-gray-300 mb-2 font-medium">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="form-input w-full"
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <label className="block text-gray-300 mb-2 font-medium">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="form-input w-full"
                          required
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <label className="block text-gray-300 mb-2 font-medium">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className="form-input w-full"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <label className="block text-gray-300 mb-2 font-medium">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us what's on your mind..."
                        rows={6}
                        className="form-input w-full resize-none"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit-btn w-full flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>

              {/* Social Links & Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Social Links */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold gradient-text mb-4">
                    Connect With Us
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Follow us on social media for updates, behind-the-scenes
                    content, and community highlights.
                  </p>

                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`social-link ${link.color}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold gradient-text mb-4">
                    Quick Questions?
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">
                        How quickly do you respond?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        We typically respond within 24 hours during business
                        days.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">
                        Can I contribute to BlogSphere?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Absolutely! We're always looking for talented writers
                        and contributors.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">
                        Technical issues?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Include as much detail as possible, and we'll help you
                        resolve it quickly.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 text-center"
            >
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Don't just contact us - join our community! Start sharing your
                stories and connect with fellow writers today.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                onClick={() => window.open("https://discord.gg/bgbJZvFw", "_blank")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:from-purple-700 hover:to-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Our Community
                </motion.button>
                <motion.button
                onClick={() => navigate('/')}
                  className="border border-purple-400 text-purple-400 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-purple-400 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Our Blog
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
