<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('')
const projectName = ref('')
const projects = ref([
  { id: 1, name: '삼성전자 기간 시스템 구축'},
  { id: 2, name: 'SK hynix 내부 시스템 운영'},
  { id: 3, name: 'KT 고객 관리 시스템 개발'},
  { id: 4, name: '농협 은행 차세대 시스템 구축'},
])

const increase = () => {
  count.value++
}

const inputName = (e) => {
  name.value = e.target.value
}

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

</script>

<template>
  <h1>Vue3 Project Tracker</h1>
  <h2>ref 연습</h2>
  <p>Name : {{ name }}</p>
  <input type="text" v-model="name" /> <br/>

  <p>Count : {{ count }}</p>
  <button @click="increase">증가</button> <br/>
  <hr>

  <h2>v-for 연습</h2>
  <input type="text" v-model="projectName" placeholder="프로젝트명 입력" /> &nbsp;
  <button @click="addProject">추가</button>
  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>프로젝트명</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(project, index) in projects" :key="project.id">
        <td>{{ index + 1 }}</td>
        <td>{{ project.name }}</td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
}

th {
  text-align: left;
}

tbody tr:hover {
  background-color: #f5f5f5;
}
</style>
