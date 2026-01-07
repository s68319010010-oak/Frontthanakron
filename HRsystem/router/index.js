import { createRouter, createWebHistory } from 'vue-router'

import Main from '../src/views/main.vue'
import ProfilePage from '../src/pages/ProfilePage.vue'
import NotFound from '../src/views/notfound.vue'
import EvaluatorAssignments from '../src/components/evaluator/EvaluatorAssignments.vue'
import TeachersAssignments from '../src/components/teachers/TeachersAssignments.vue'
import Signup from '../src/pages/signup.vue'
import SignIn from '../src/pages/signin.vue'
import EvaluationForm from '../src/views/evaluationform.vue'
import dashboard from '../src/pages/dashboard.vue'

const routes = [
  // หน้าแรก
  {
    path: '/',
    redirect: '/profile'
  },

  // โปรไฟล์ / dashboard
  {
    path: '/profile',
    component: Main
  },

  // evaluator assignment list
  {
    path: '/evaluator',
    component: EvaluatorAssignments
  },

  // ⭐ ฟอร์มประเมิน (ตัวนี้สำคัญ)
  {
    path: '/evaluator/assignments/:id',
    component: EvaluationForm,
    props: true
  },

  // ครู
  {
    path: '/teachers',
    component: TeachersAssignments
  },

  // รายงาน
  {
    path: '/reports',
    component: () => import('../src/components/evaluator/reports.vue')
  },

  // สมัครสมาชิก
  {
    path: '/signup',
    component: Signup
  },
  
   {
    path: '/signin',
    component: SignIn
  },

  // task / profile page
  {
    path: '/task',
    component: ProfilePage
  },
  {
path: '/dashboard',
component: () => import('../src/pages/dashboard.vue'),
//meta: { requiresAuth: true, adminOnly: true }
},

  // 404
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
