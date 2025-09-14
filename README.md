# 📖 AEC Library Web Application

A modern **digital library management system** built with **Express.js** and **Turso (libSQL)** to streamline how students and faculty manage, search, and borrow books at AEC.  
The app transforms the traditional library into a **smart, interactive, and always-available platform**.

---
## Live Demo
https://aec-cloud-book-snh8.vercel.app/ 

--- 
## Login Credentials
**Register No**: 510422104050 

**Date Of Birth**: 25-06-2005 

---

## 🚀 Features

- 🔍 **Smart Search & Filters** – Search books by title, author, department, or year.  
- 📚 **Book Management** – Add, update, and track book copies seamlessly.  
- 👨‍🎓 **Student Records** – Manage student profiles with register number, DOB, department, and email.  
- 📊 **Database-Driven** – Reliable storage powered by **Turso (libSQL)**.  
- ⚡ **Fast & Secure Backend** – Built with **Express.js**, fully REST-API based.  
- 🌍 **Deploy Anywhere** – Runs smoothly on Vercel, local servers, or cloud platforms.  

---

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, React.js
- **Backend**: Express.js (Node.js)  
- **Database**: Turso (libSQL)  
- **Middleware**: CORS, JWT (for authentication)  
- **Deployment**: Vercel / Localhost  

---

## 📂 Database Schema

### `student` Table
| Column        | Type  | Description                  |
|---------------|-------|------------------------------|
| register_no   | TEXT  | Primary Key (unique ID)      |
| username      | TEXT  | Student’s full name          |
| department    | TEXT  | Department (CSE, ECE, etc.) |
| date_of_birth | TEXT  | Date of birth (DD-MM-YYYY)   |
| email         | TEXT  | Student email                |

### `books` Table
| Column         | Type     | Description                     |
|----------------|----------|---------------------------------|
| book_id        | TEXT     | Primary Key (unique book ID)    |
| book_name      | TEXT     | Title of the book               |
| author         | TEXT     | Author of the book              |
| number_of_pages| INTEGER  | Total pages                     |
| published_year | INTEGER  | Year of publication             |
| publisher      | TEXT     | Publisher name                  |
| description    | TEXT     | Short description               |
| book_count     | INTEGER  | Available copies                |

---

## ⚙️ Installation & Setup

1. **Clone the repository**
    
   ```bash
   Setup Backend:

   git clone https://github.com/kannadhasan2/AEC-Cloud-Book 
   cd Backend 
   npm install 
   node server.js 

   Setup Frontend:

   cd my-app 
   npm install 
   npm run dev
   
