# 🚀 Vue 3 Project Tracker

<img src="https://github.com/user-attachments/assets/bf4186fd-7498-4ce3-bf09-1e4e9d90fd6a" alt="Vue 3 Project Tracker Screenshot"/>

A simple CRUD application built with Vue 3 to refresh and validate modern Vue development skills.

---

## 🎯 Purpose
This project was created to refresh and transition from Vue 2 to Vue 3.

Since I have previous experience developing with Vue 2, the focus is not on learning Vue from scratch, but on understanding the key changes in Vue 3, including the Composition API, Pinia, and modern project structure.

This project is also designed to work with a Spring Boot backend through REST API integration.

---

## 💻 Init & Installation

```bash
npm create vue@latest .

package name:
vue3-study

use typescript?
no

select features to include in your project?
Router (SPA development)

Select experimental features to include in your project?
(none)

Skip all example code and start with a blank Vue project?
yes

npm install
npm run dev
```

🛠️ Tech Stack
- Vue 3
- Vue Router
- Pinia
- Axios
- Spring Boot (REST API)
- Oracle Database
- Firebase Hosting

📌 Features
- Project List
- Create Project
- Update Project
- Delete Project
- Project Status Management
- Backend API Integration

📂 Repository Structure
This project is divided into two separate repositories.

Backend Repository (Spring Boot API)
- REST API server
- Oracle DB integration
- SQL DDL / DML included
- CORS configured for frontend communication
- Business logic layer (Controller / Service / Repository)

GitHub: https://github.com/devLsy/project-api

## Run
```
npm install
npm run dev
```

🎯 Learning Goals
- Refresh Vue development experience after working primarily with React and backend projects
- Learn Vue 3 Composition API
- Understand state management with Pinia
- Compare Vue 2 and Vue 3 development patterns
- Build and deploy a full-stack CRUD application using Spring Boot backend

🔌 Backend Integration Example
This frontend communicates with a Spring Boot REST API.
Example (Frontend)
``` javascript
axios.get("http://localhost:8080/api/projects")
```

``` java
@GetMapping("/api/projects")
public List<Project> getProjects() {
    return projectService.findAll();
}
```

🚀 Deployment Strategy
- Frontend: Firebase Hosting
- Backend: Spring Boot (Local)
- Database: Oracle DB

## End-to-End Flow
Vue 3 → Axios → Spring Boot → Oracle DB → JSON Response → Vue Update

## Notes
This project focuses on practical full-stack development rather than theoretical Vue learning.
The goal is to simulate a production-style architecture with separated frontend and backend repositories connected via REST API.
