# **Shop Prototype for WEPPO**

## **Features**

- User authentication (register, login, logout)
- Product browsing (anonymous users)
- Shopping cart and order management (logged-in users)
- Admin panel for managing products, users, and orders

---

## **Getting Started**

### **Prerequisites**

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---

### **1. Clone the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/Xaro8/weppo-sklep
cd weppo-sklep
```

---

### **2. Install Dependencies**

Install the required Node.js packages:

```bash
npm install
```

---

### **4. Set Up the Database**

```
sudo -i -u postgres
psql
CREATE DATABASE weppo_db;
\q
exit
```

---

### **5. Start the Application**

Run the app using:

```bash
node app.js
```

The server should now be running at:

```
http://localhost:3000
```
---

## **Folder Structure**

```
your-repo/
│
├── models/         # Database models (e.g., User, Product, Order)
├── routes/         # Route handlers (e.g., auth.js, admin.js, products.js)
├── views/          # EJS templates for rendering
├── public/         # Static files (CSS, images, JS)
├── init.sql        # SQL script to initialize the database
├── .env.example    # Example environment variables
├── app.js          # Main application file
├── config.js       # Centralized configuration
└── README.md       # This file
```

---

### **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---