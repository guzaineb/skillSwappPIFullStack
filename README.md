# About the Project

This project was developed as part of an academic group assignment at **ESPRIT University** for the Computer Science Engineering Cycle. Our mission was to design and implement a full-stack web platform that supports AI-assisted skill exchange between users, featuring tools for learning, teaching, real-time interaction, and intelligent course guidance.

# Skill Exchange Platform

An AI-enhanced skill exchange web application where users can:

- Sign up as students or teachers  
- Learn and teach new skills  
- Chat in real time  
- Take quizzes  
- Manage and apply for tasks  
- Interact with AI for course guidance  

All from one centralized dashboard.

# Getting Started

## 1. Clone the Repository


> Make sure to switch to the `integration` branch.

## 2. Install Dependencies

Ensure you have Node.js installed. Then:


cd frontend
npm install

cd ../backend
npm install


## 3. Run the Application

Start both the frontend and backend servers by running:
npm run dev
in both of their terminals.


Once both servers are running, navigate to:

http://localhost:5173/signin


# Features

## Authentication

- Sign Up with OTP Verification (email-based)
- Sign In with email and password
- Forgotten Password reset via email link

## User Dashboard

After login, users can access:

- Profile Management (edit profile, change password)
- Courses (browse and explore)
- Learn New Skills (enroll in available courses)
- Add Skills (for teachers)
- Chatroom (real-time chat with users)
- Chatbot (AI summary/explanation of courses)
- Quizzes (teacher-uploaded, required to pass)
- Student & Teacher Dashboards (role-based views)
- Task Management:
  - Add tasks
  - Apply for tasks
  - Accept or reject applications

# Tech Stack

- **Frontend**: React, TailwindCSS  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Authentication**: JWT, Email OTP  
- **Chat & Chatbot**: (e.g., Socket.IO, OpenAI, Ollama)  
- **Quizzes**: Role-based access system

# Payment Management

Skill purchases are handled securely using **Stripe Checkout**.

## How It Works

- A Stripe Checkout session is dynamically created.
- Stripe securely handles all payment steps.
- After successful payment, the user is redirected to the platform with access.
- If canceled, the user returns to the skills page.

## Test Payments

To test the Stripe flow:

- Card number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3-digit number

# Task Management Module

Users can post and apply for tasks to foster skill exchange and collaboration.

## Features

- **Task Posting**  
  - Title  
  - Description  
  - Optional compensation  
  - Timestamped info  

- **Task Application**  
  - CV upload (PDF)  
  - Application tracking  

- **AI-Powered CV Analysis**  
  - Local AI (via Ollama) compares CV content with task requirements  
  - Instant feedback on applicant-task match

## Security Notes

- Only authenticated users can create/apply to tasks.
- File uploads are validated before processing.
- Users cannot apply to their own tasks (handled on frontend).
