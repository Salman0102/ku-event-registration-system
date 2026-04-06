# 🎓 Karnavati University Event Registration System

---

## 📌 Overview
A full-stack event registration system where students can register for university events with real-time seat tracking and admin management.

---

## ✨ Features
- 🎯 Register for multiple events  
- 🔒 Maximum 3 events per student  
- 🚫 Duplicate registration prevention  
- 📊 Real-time seat tracking  
- 🎨 Premium UI (gradient + hover effects)  
- 🛠️ Admin panel (view, search, delete)  

---

## 🛠️ Tech Stack
- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js, Express.js  
- Database: MySQL  

---

## 📦 Installation Guide

### 1️⃣ Install Node.js  
https://nodejs.org  

### 2️⃣ Install MySQL  
https://dev.mysql.com/downloads/mysql/  

### 3️⃣ Install MySQL Workbench  
https://dev.mysql.com/downloads/workbench/  

---

## 🗄️ Setup Database

CREATE DATABASE college_event;

USE college_event;

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  capacity INT
);

CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15),
  kuid VARCHAR(20),
  event_id INT,
  FOREIGN KEY (event_id) REFERENCES events(id)
);

---

## ▶️ Run Project

npm install express mysql2 cors  
node server.js  

Open index.html in browser.

---

## 👨‍💻 Author
Salman Shaikh
