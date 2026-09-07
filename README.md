#  TeamFlow – Project Management System

##  Overview

TeamFlow is a full-stack project management application designed to manage teams, projects, and tasks efficiently.
It supports authentication, role-based access, and real-time project tracking in a scalable production environment.

---

##  Live Demo

🔗 https://teamflow1.duckdns.org/

---

##  Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL

### DevOps & Deployment

* Docker & Docker Compose
* AWS EC2
* Nginx (Reverse Proxy)
* HTTPS (Certbot)
* GitHub Actions (CI/CD)

---

##  Features

* 🔐 Authentication (Login/Register)
* 👥 Role-based Access (Admin, Manager, Member)
* 📁 Project Management
* ✅ Task Management
* 💬 Comments System
* 🔄 CI/CD Auto Deployment
* 🌍 Live Production Deployment

---

##  Architecture

User → Domain → HTTPS → Nginx → Docker Containers
→ Next.js Frontend
→ Express Backend
→ PostgreSQL Database

---

##  Installation (Local Setup)

```bash
git clone https://github.com/udaifa123/Teamflow.git
cd teamflow
docker compose up --build
```

---

##  CI/CD Workflow

* Push code to GitHub
* GitHub Actions triggers deployment
* Connects to EC2 via SSH
* Pulls latest code
* Rebuilds Docker containers

---

##  Deployment

* AWS EC2 instance
* Dockerized full-stack app
* Nginx reverse proxy
* HTTPS enabled with Let's Encrypt

---

##  Screenshots

<img width="1889" height="867" alt="Screenshot 2026-09-07 085549" src="https://github.com/user-attachments/assets/6746196a-0435-436b-9894-8ee615b45d59" />


---

## 📌 Future Improvements

* 📤 File Upload (AWS S3)
* 📊 Monitoring (CloudWatch)


---

##  Author

**Udaifa K.K.**
🔗 https://github.com/udaifa123
🔗 https://www.linkedin.com/in/udaifa-k-k-777328394/

---
