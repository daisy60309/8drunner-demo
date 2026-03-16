import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ComplaintListView from '../views/ComplaintListView.vue'
import ReportEditorView from '../views/ReportEditorView.vue'
import DashboardView from '../views/DashboardView.vue'
import IntakeView from '../views/IntakeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/intake',
    name: 'intake',
    component: IntakeView,
  },
  {
    path: '/complaints',
    name: 'complaints',
    component: ComplaintListView,
  },
  {
    path: '/report/:id?',
    name: 'report',
    component: ReportEditorView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router