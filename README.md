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
  ``` sudo apt install nodejs ```
- [PostgreSQL](https://www.postgresql.org/)
  ``` sudo apt install postgresql ```
- [Git](https://git-scm.com/)
  ``` sudo apt install git ```

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
ALTER USER postgres PASSWORD 'postgres';
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
weppo-sklep/
│
├── config/         # Config files
├── controllers/    # Server logic
├── middlewares/    # Middlewares
├── models/         # Database models
├── public/         # Static files
├── routes/         # Route handlers
├── views/          # EJS templates
├── app.js          # Main application file
├── README.md       # This file
```

---