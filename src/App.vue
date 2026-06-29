<script setup>
import { ref, onMounted } from 'vue'

import {
  getProjects,
  createProject,
  updateProject as updateProjectApi,
  deleteProject as deleteProjectApi
} from './api/projectApi'

const count = ref(0)
const name = ref('')
const editedId = ref(null)
const projectName = ref('')
const projects = ref([])

/**
 * 프로젝트 목록 조회
 */
const loadProjects = async () => {
  const { data } = await getProjects()
  projects.value = data
}

onMounted(loadProjects)

/**
 * 프로젝트 추가
 */
const addProject = async () => {
  if (projectName.value.trim() === '') {
    alert('프로젝트명을 입력해주세요.')
    return
  }

  if (!confirm('정말 추가하시겠습니까?')) return

  await createProject({
    name: projectName.value
  })

  await loadProjects()

  projectName.value = ''
}

/**
 * 프로젝트 삭제
 * @param id 
 */
const deleteProject = async (id) => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  await deleteProjectApi(id)
  await loadProjects()
}

const startEdit = (project) => {
  editedId.value = project.id
  projectName.value = project.name
}

/**
 * 프로젝트 수정
 */
const updateProject = async () => {
  if (!confirm('정말 수정하시겠습니까?')) return
  await updateProjectApi(editedId.value, {
    name: projectName.value 
  })

  await loadProjects()

  editedId.value = null
  projectName.value = ''
  input.focus()
}
</script>

<template>
  <h1>Vue3 Project Tracker</h1>
  <input type="text" v-model="projectName" placeholder="프로젝트명 입력" /> &nbsp;
  <button 
    :class="editedId === null ? 'btn-add' : 'btn-edit'"
    @click="editedId === null ? addProject() : updateProject()">
    {{ editedId === null ? '추가' : '저장' }}
  </button>

  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>프로젝트명</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(project, index) in projects" :key="project.id" :class="{ editing: editedId === project.id }">
        <td>{{ index + 1 }}</td>
        <td class="project-name" @click="startEdit(project)">
          {{ project.name }}
        </td>
        <td>
          <button @click="deleteProject(project.id)" class="btn-delete">
            삭제
          </button>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

th {
  background-color: #f8fafc;
  color: #334155;
  font-weight: 600;
  text-align: left;
  padding: 14px;
  border-bottom: 2px solid #e2e8f0;
}

td {
  padding: 14px;
  border-bottom: 1px solid #e2e8f0;
}

tbody tr {
  transition: background-color 0.2s;
}

tbody tr:hover {
  background-color: #f8fafc;
}

tbody tr:last-child td {
  border-bottom: none;
}

button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-size: 14px;
  transition: 0.2s;
}

button:hover {
  opacity: 0.9;
}

.btn-add {
  background-color: #2563eb;   /* 파랑 */
}

.btn-edit {
  background-color: #f59e0b;   /* 주황 */
}

.btn-delete {
  background-color: #dc2626;   /* 빨강 */
}

input {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-width: 300px;
  margin-bottom: 10px;
}

h1 {
  color: #1e293b;
}

h2 {
  margin-top: 30px;
  color: #475569;
}

hr {
  margin: 30px 0;
  border: none;
  border-top: 1px solid #e2e8f0;
}

td:last-child {
    text-align: center;
}

.editing {
    background: #fff7d6;
}

.project-name {
  cursor: pointer;
  transition: 0.2s;
}

.project-name:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>
