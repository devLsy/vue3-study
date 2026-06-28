<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('')
const editedId = ref(null)
const projectName = ref('')
const projects = ref([])

const increase = () => count.value++


const inputName = (e) => name.value = e.target.value

const addProject = () => {
  if (projectName.value.trim() === '') {
    alert('프로젝트명을 입력해주세요.');
    return;
  }

  const newProject = {
    id: Date.now(),
    name: projectName.value
  };
  projects.value.push(newProject);
  projectName.value = '';
}

const deleteProject = (id) => {
  if(confirm('정말 삭제하시겠습니까?')) {
    projects.value = projects.value.filter(project => project.id !== id);
  }
}

const startEdit = (project) => {
  editedId.value = project.id
  projectName.value = project.name
}

const updateProject = () => {
  projects.value = projects.value.map(project => {
    if (project.id === editedId.value) {
      return { ...project, name: projectName.value };
    }
    return project;
  });
  editedId.value = null;
  projectName.value = '';
}

</script>

<template>
  <h1>Vue3 Project Tracker</h1>
  <p>Name : {{ name }}</p>
  <input type="text" v-model="name" /> <br/>

  <p>Count : {{ count }}</p>
  <button @click="increase">증가</button> <br/>
  <hr>

  <input type="text" v-model="projectName" placeholder="프로젝트명 입력" /> &nbsp;
  <button @click="addProject">추가</button> &nbsp; 
  <button v-if="editedId !== null" @click="updateProject(editedId)">수정 저장</button>

  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>프로젝트명</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(project, index) in projects" :key="project.id">
        <td>{{ index + 1 }}</td>
        <td @click="startEdit(project)">
          {{ project.name }}
        </td>
        <td>
          <button @click="deleteProject(project.id)">
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
  background-color: #2563eb;
  color: white;
  font-size: 14px;
  transition: 0.2s;
}

button:hover {
  opacity: 0.9;
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
</style>
