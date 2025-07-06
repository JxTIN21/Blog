# BlogSphere 🌐

A full-stack blog platform built with **React**, **Flask**, and **Tailwind CSS**.

## ✨ Features

- JWT-based user authentication (login, register, logout)
- Protected routes using React Router
- Blog creation, viewing, liking, and reviewing
- Modern animated UI using Tailwind CSS and Framer Motion
- Responsive mobile navigation and design
- REST API with Flask (Python) backend
- Environment-based API endpoint support

---

## 📁 Folder Structure

```
/frontend
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Blog/
│   │   └── Common/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── tailwind.config.js

/backend
├── app.py
├── models.py
├── routes/
│   ├── auth.py
│   └── blog.py
├── utils/
├── requirements.txt
└── config.py
```

---

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend (Python + Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

---

## 🔐 Environment Variables

### Frontend (`.env`)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🛠 Tech Stack

**Frontend**:
- React
- Tailwind CSS v3.4.3
- Framer Motion
- Lucide Icons

**Backend**:
- Flask
- Flask-JWT-Extended
- SQLAlchemy

---

## 🧪 Testing

- Unit tests: Coming soon!
- Manual testing with Postman & browser dev tools

---

## 📄 License

MIT License

---

## 💡 Inspiration

This project was built as a modern, scalable blogging platform with smooth UX and a futuristic visual identity.

---

## 📬 Contact

Developed by **Jatin Srivastava** – feel free to reach out!
