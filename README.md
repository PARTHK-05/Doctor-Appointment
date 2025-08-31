


# Doctor Appointment Booking System


## 🚀 Live Demo
- [Admin & Doctor Portal](https://doctor-appointment-admin-ep7h2mvq7.vercel.app)  
- [Patient Portal](https://doctor-appointment-patient.vercel.app)  

---

## Overview

Doctor Appointment Booking System is a full-stack web application that simplifies the process of scheduling and managing medical appointments. It provides dedicated portals for patients, doctors, and administrators, ensuring a smooth and secure experience for all users.

---

## Features

- **Patient Portal**: Register, log in, book appointments, view appointment history, and manage profile.
- **Doctor Portal**: View and manage appointments, update profile, and track patient interactions.
- **Admin Panel**: Add and manage doctors, view all appointments, oversee users, and monitor system activity.
- **Authentication**: Secure login and registration with role-based access control.
- **Responsive UI**: Modern, mobile-friendly design for all user types.
- **Notifications**: Real-time feedback and notifications for key actions.
- **RESTful API**: Robust backend for handling all business logic and data operations.

---

## Tech Stack

- **Frontend**: React, Vite, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: JWT for authentication, Cloudinary for file uploads, ESLint for code quality

---

## Folder Structure

- `frontend/` — React-based user interface for patients
- `admin/` — React-based admin dashboard
- `backend/` — Node.js/Express REST API, database models, controllers, and routes

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
	```sh
	git clone https://github.com/PARTHK-05/Doctor-Appointment.git
	cd Doctor-Appointment
	```

2. **Install dependencies:**
	```sh
	cd backend
	npm install
	cd ../frontend
	npm install
	cd ../admin
	npm install
	```

3. **Configure environment variables:**
	- Create a `.env` file in the `backend` folder with your MongoDB URI and other secrets.

4. **Start the backend server:**
	```sh
	cd backend
	npx nodemon server.js
	```

5. **Start the frontend and admin apps:**
	```sh
	cd frontend
	npm run dev
	cd ../admin
	npm run dev
	```

---


## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.





