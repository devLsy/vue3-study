import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api"
})

// READ
export const getProjects = () => api.get("/projects")

// CREATE
export const createProject = (data) => api.post("/projects", data)

// UPDATE
export const updateProject = (id, data) => api.put(`/projects/${id}`, data)

// DELETE
export const deleteProject = (id) => api.delete(`/projects/${id}`)