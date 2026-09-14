# 📚 Quora Clone (Backend Learning Project)

A beginner-friendly full-stack RESTful Web Application built with **Node.js**, **Express**, and **EJS**. This project demonstrates complete **CRUD** (Create, Read, Update, Delete) operations using REST API conventions and HTML form overrides.

---

## 🎯 Learning Objectives

By working through or studying this project, you will learn:
1. **RESTful Routing**: Map standard HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`) to server endpoints.
2. **EJS Templating Engine**: Render dynamic HTML on the server using EJS views.
3. **HTML Form Method Overriding**: Use `method-override` middleware to support `PATCH` and `DELETE` requests directly from traditional HTML forms.
4. **Static Middleware**: Serve custom CSS (`style.css`) via Express static files.
5. **In-Memory Data Handling**: Work with JavaScript arrays and `uuid` for unique resource identification.

---

## 🛠️ Tech Stack & Dependencies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Backend framework for route handling.
- **EJS (Embedded JavaScript)**: Server-side template engine for HTML rendering.
- **uuid**: Package to generate unique IDs (`v4`).
- **method-override**: Middleware to simulate `PATCH` and `DELETE` from standard HTML forms.

---

## 📁 Project Structure

```text
Quora/
├── public/
│   └── style.css          # Global stylesheet (Quora theme)
├── views/
│   ├── index.ejs          # All posts feed view
│   ├── show.ejs           # Single post details view
│   ├── new.ejs            # Create post form view
│   └── edit.ejs           # Edit post form view
├── index.js               # Main Express server & route definitions
├── package.json           # Node dependencies & project metadata
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** installed on your system. You can verify installation by running:
```bash
node -v
npm -v
```

### 2. Installation
Clone or download the project folder, then navigate into the directory and install dependencies:
```bash
npm install express ejs uuid method-override
```

### 3. Running the App
Start the Node server:
```bash
node index.js
```

Open your browser and navigate to:
```text
http://localhost:8080/posts
```

---

## 🛣️ RESTful Routes Overview

| HTTP Method | Route Endpoint | Purpose / Description | EJS Template Rendered |
| :--- | :--- | :--- | :--- |
| **GET** | `/posts` | Display feed of all posts | `index.ejs` |
| **GET** | `/posts/new` | Display form to create a new post | `new.ejs` |
| **POST** | `/posts` | Handle post creation & redirect to `/posts` | *(Redirects)* |
| **GET** | `/posts/:id` | Display details for a specific post | `show.ejs` |
| **GET** | `/posts/:id/edit` | Display form to edit post content | `edit.ejs` |
| **PATCH** | `/posts/:id` | Process content update & redirect to `/posts` | *(Redirects)* |
| **DELETE** | `/posts/:id` | Remove post & redirect to `/posts` | *(Redirects)* |

---

## 💡 Key Code Snippets Explained

### 1. `method-override` for HTML Forms
Standard HTML forms only support `GET` and `POST`. To allow `PATCH` and `DELETE`, `method-override` checks for a `_method` query parameter:

```javascript
// index.js
app.use(methodOverride('_method'));
```

```html
<!-- edit.ejs -->
<form method="post" action="/posts/<%=post.id%>/?_method=PATCH">
    ...
</form>
```

### 2. Dynamic Unique IDs
When creating a post, `uuidv4()` assigns a unique string ID:

```javascript
const { v4: uuidv4 } = require('uuid');

app.post('/posts', (req, res) => {
    const { username, content } = req.body;
    posts.push({ id: uuidv4(), username, content });
    res.redirect('/posts');
});
```

---
