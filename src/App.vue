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
const keyword = ref('')

// 페이지네이션 관련
const page = ref(0)
const size = ref(10)
const totalPages = ref(0)
const totalElements = ref(0)

/**
 * 프로젝트 목록 조회
 */
const loadProjects = async () => {
  const { data } = await getProjects(page.value, size.value, keyword.value)
  projects.value = data.content
  totalPages.value = data.totalPages
  totalElements.value = data.totalElements
} 

// 검색 초기화
const resetSearch = () => {
  keyword.value = ''
  page.value = 0
  loadProjects()
}

onMounted(loadProjects)

// 페이지 이동
const movePage = (pageNumber) => {
  page.value = pageNumber
  loadProjects()
}

// 다음 페이지
const nextPage = () => {
  if (page.value + 1 < totalPages.value) {
    page.value++
    loadProjects()
  }
}

// 이전 페이지
const prevPage = () => {
  if (page.value > 0) {
    page.value--
    loadProjects()
  }
}

/**
 * 프로젝트 추가
 */
const addProject = async () => {
  if (!validateProject()) return

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
  if (!validateProject()) return

  if (!confirm('정말 수정하시겠습니까?')) return
  await updateProjectApi(editedId.value, {
    name: projectName.value 
  })

  await loadProjects()

  editedId.value = null
  projectName.value = ''
  input.focus()
}

 /**
  * 입력값 검증
  * @returns {boolean}
  */
const validateProject = () => {
  if (projectName.value.trim() === '') {
    alert('프로젝트명을 입력해주세요.')
    return false
  }

  if (projectName.value.length > 100) {
    alert('프로젝트명은 100자 이하만 입력 가능합니다.')
    return false
  }
  
  return true
}

</script>

<template>
  <h1>Vue3 Project Tracker</h1>
  <!-- 등록/수정 영역 -->
  <div class="form-area">
    <input 
      type="text" 
      v-model="projectName" 
      placeholder="프로젝트명 입력" 
      @keyup.enter="editedId === null ? addProject() : updateProject()" 
    /> &nbsp;
    <button 
      :class="editedId === null ? 'btn-add' : 'btn-edit'"
      @click="editedId === null ? addProject() : updateProject()">
      {{ editedId === null ? '추가' : '저장' }}
    </button>
  </div>

  <!-- 검색 영역 -->
  <div class="search-area">
    <input
      type="text"
      v-model="keyword"
      placeholder="프로젝트명 검색"
      @keyup.enter="page = 0; loadProjects()"
    />
    &nbsp;
    <button @click="page = 0; loadProjects()" class="btn-search">조회</button>

    &nbsp;

    <button
      @click="resetSearch"
      class="btn-reset">
      초기화
    </button>

  </div>

  <!-- 추가 -->
  <div class="total-count">
    총 {{ totalElements }}건
  </div>

  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>프로젝트명</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="projects.length > 0" v-for="(project, index) in projects" :key="project.id" :class="{ editing: editedId === project.id }">
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

      <tr v-else>
        <td colspan="3" class="empty-message">
          검색 결과가 없습니다.
        </td>
      </tr>
    </tbody>
  </table>

  <!-- ✔ 페이지네이션 영역 -->
  <div class="pagination">
    <button @click="prevPage" :disabled="page === 0">
      Prev
    </button>

    <button
      v-for="n in totalPages"
      :key="n"
      @click="movePage(n - 1)"
      :class="{ active: page === n - 1 }"
    >
      {{ n }}
    </button>

    <button @click="nextPage" :disabled="page + 1 >= totalPages">
      Next
    </button>
  </div>

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
  background-color: #2563eb;   
}

.btn-edit {
  background-color: #f59e0b;   
}

.btn-delete {
  background-color: #dc2626;   
}

.btn-search {
  background-color: #16a34a;
}

.btn-search:hover {
  background-color: #15803d;
}

.btn-reset {
  background-color: #94a3b8;
  color: white;
}

.btn-reset:hover {
  background-color: #64748b;
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;  
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #e2e8f0;
  color: #334155;
  cursor: pointer;
  transition: 0.2s;
}

/* 마우스 오버 */
.pagination button:hover:not(:disabled) {
  background-color: #2563eb;
  color: white;
}

/* 현재 페이지 */
.pagination button.active {
  background-color: #2563eb;
  color: white;
  font-weight: bold;
}

/* Prev, Next 비활성 */
.pagination button:disabled {
  background-color: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
  opacity: 1; /* 기본 opacity 0.6 대신 깔끔하게 */
}

.page-info {
  font-weight: bold;
}

.form-area,
.search-area {
  margin-bottom: 12px;
}

.total-count {
  margin: 12px 0;
  color: #475569;
  font-size: 14px;
  font-weight: 600;
}

.empty-message {
  text-align: center;
  color: #64748b;
  padding: 30px;
  font-style: italic;
}

</style>
