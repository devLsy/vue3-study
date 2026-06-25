# Vue3 Project Tracker

A simple CRUD application built with Vue 3 to refresh and validate modern Vue development skills.

## Purpose

This project was created to refresh and transition from Vue 2 to Vue 3.

Since I have previous experience developing with Vue 2, the focus is not on learning Vue from scratch, but on understanding the key changes in Vue 3, including the Composition API, Pinia, and modern project structure.

## Init

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

## Tech Stack

* Vue 3
* Vue Router
* Pinia
* Axios
* Firebase Hosting

## Features

* Project List
* Create Project
* Update Project
* Delete Project
* Project Status Management

## Run

```bash
npm install
npm run dev
```

## Learning Goals

* Refresh Vue development experience after working primarily with React and backend projects.
* Learn the Vue 3 Composition API.
* Understand state management with Pinia.
* Compare Vue 2 and Vue 3 development patterns.
* Build and deploy a simple CRUD application using modern Vue 3 practices.

## Deployment

This project can be deployed using Firebase Hosting.

## Next Steps

The following features will be implemented as part of the Vue 3 migration and hands-on practice.

### Component Architecture

* Split the application into reusable components
* Parent ↔ Child communication
* Props
* Custom Events (emit)

### State Management

* Manage global state with Pinia
* Compare local state (`ref`) and store-based state

### Backend Integration

* Connect Vue 3 frontend with Spring Boot REST API
* Axios HTTP communication
* Oracle Database CRUD operations

### End-to-End Validation

* Deploy frontend using Firebase Hosting
* Verify complete CRUD workflow
* Connect frontend, backend, and database together

### Target Architecture

```text
Vue 3
 ├─ Components
 ├─ Pinia
 ├─ Axios
 │
 ▼
Spring Boot REST API
 │
 ▼
Oracle Database
```

## Notes

This repository focuses on practical Vue 3 development rather than theoretical study, with the goal of building a production-style CRUD application integrated with a Spring Boot backend.
