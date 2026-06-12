# 🎓 College Events Awareness Platform

A Full-Stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to help students discover, explore, and stay updated with technical, academic, and career-oriented events conducted by colleges across different locations.

---

## 📌 Problem Statement

Students often miss valuable opportunities such as:

* Hackathons
* Workshops
* Technical seminars
* Coding competitions
* Placement training sessions
* Research conferences
* Innovation challenges

because event information is scattered across multiple sources like WhatsApp groups, Instagram pages, college websites, posters, and emails.

There is no centralized platform where students can easily search and discover upcoming college events based on their interests.

This project aims to solve that problem by providing a single platform that aggregates event information and allows students to find relevant opportunities quickly.

---

# 💡 Project Idea & Intuition

The inspiration behind this project came from a common challenge faced by students.

Many colleges organize excellent technical and career-focused events, but students from other institutions often remain unaware of them. As a result, numerous learning and networking opportunities are missed.

The idea is simple:

> "What if there was a single platform where students could discover events from multiple colleges based on their interests, location, and preferred mode of participation?"

This platform acts as a centralized event discovery system that bridges the information gap between colleges and students.

---

# 🎯 Objectives

* Create a centralized event discovery platform.
* Improve awareness of technical and academic opportunities.
* Help students find events matching their interests.
* Enable administrators to manage event information efficiently.
* Reduce the effort required to search for events across multiple platforms.

---

# 🚀 Key Features

## 👨‍🎓 Student Features

### Event Discovery

Students can browse all available events posted on the platform.

### Advanced Filtering

Events can be filtered based on:

* Domain

  * AI
  * Machine Learning
  * Web Development
  * Cyber Security
  * Data Science
  * Cloud Computing
  * And more

* City

* Event Mode

  * Online
  * Offline
  * Hybrid

### Flexible Search Experience

Users are not required to fill every filter field.

Examples:

* Select only AI → See all AI-related events.
* Select only Hyderabad → See all events in Hyderabad.
* Select only Online → View all online events.

This improves usability and allows faster event discovery.

### Event Details

Students can view:

* Event Name
* College Name
* City
* Date
* Domains
* Event Mode
* Registration Link

### Direct Registration

Users can directly access the registration page through the provided registration link.

---

## 👨‍💼 Admin Features

### Secure Authentication

Administrators can log in through a protected admin dashboard.

### Add New Events

Admins can create and publish new events.

### Edit Events

Existing events can be updated whenever information changes.

### Delete Events

Outdated or incorrect events can be removed.

### Dashboard Management

A dedicated dashboard allows complete event management through an intuitive interface.

---

# 🏗️ System Workflow

### Step 1

Administrator logs into the dashboard.

### Step 2

Administrator adds event information:

* Event Title
* College Name
* City
* Event Date
* Domains
* Event Mode
* Registration Link

### Step 3

Event data is stored in MongoDB.

### Step 4

Students visit the platform.

### Step 5

Students apply filters according to their interests.

### Step 6

Relevant events are displayed instantly.

### Step 7

Students register for events using the provided registration links.

---

# 🛠️ Technology Stack

## Frontend

* React.js
* React Router
* Axios
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Tokens)
* bcrypt.js (Password Hashing)

## Version Control

* Git
* GitHub

---

# 📂 Project Structure

```text
college-events-awareness-platform
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── Components
│   │   ├── pages
│   │   ├── styles
│   │   └── App.js
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── package.json
└── README.md
```

---

# 🔐 Security Features

* Passwords are hashed using bcrypt.js.
* JWT-based authentication for admin access.
* Protected event management routes.
* Unauthorized users cannot modify event data.

---

# 🌟 Future Enhancements

The platform can be extended with:

* Email OTP Authentication
* Event Approval Workflow
* Student Accounts
* Event Bookmarking
* Personalized Recommendations
* Notification System
* Event Submission by Students
* Event Analytics Dashboard
* AI-Based Event Recommendations

---

# 📈 Impact

This platform helps students:

* Discover opportunities beyond their own college.
* Participate in more hackathons and workshops.
* Improve networking and collaboration.
* Stay informed about technical events.
* Enhance career and learning opportunities.

At the same time, it helps colleges increase participation and visibility for the events they organize.


