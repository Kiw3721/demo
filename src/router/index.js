import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 所有权限通用路由表，如首页和登录页和一些不用权限的公用页面
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '学生信息',
        icon: 'dashboard',
      }
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

]


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 异步挂载的路由，动态需要根据权限加载的路由表
 */
export const asyncRoutes = [
 
  {
    path: '/assessment',
    component: Layout,
    redirect: '/assessment/table',
    alwaysShow: true,
    name: 'Assessment',
    meta: {
      title: '综合测评',
      icon: 'el-icon-s-help',
      roles: ['0']
    },
    children: [{
      path: 'table',
      name: 'Table',
      component: () => import('@/views/assessment/table'),
      meta: {
        title: '综合测评表',
        icon: 'table',
        roles: ['0']
      }
    },
      {
        path: 'rewards',
        name: 'Rewards',
        component: () => import('@/views/assessment/rewards'),
        meta: {
          title: '奖扣分来源表',
          icon: 'table',
          roles: ['0']
        },
        children: [{
          path: 'moral',
          component: () => import('@/views/assessment/moral'),
          name: 'moral',
          meta: {
            title: '思想分',
            roles: ['0']
          }
        },
          {
            path: 'study',
            component: () => import('@/views/assessment/study'),
            name: 'study',
            meta: {
              title: '学业分',
              roles: ['0']
            }
          },
          {
            path: 'sport',
            component: () => import('@/views/assessment/sport'),
            name: 'sport',
            meta: {
              title: '文体分',
              roles: ['0']
            }
          }
        ]
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    meta: {roles: ['0']},
    children: [{
      path: 'apply',
      name: 'Apply',
      component: () => import('@/views/apply/index'),
      meta: {
        title: '贫困申请',
        icon: 'form',
        roles: ['0']
      }
    }]
  },
  {
    path: '/health',
    component: Layout,
    meta: {roles: ['0']},
    children: [{
      path: 'health',
      name: 'health',
      component: () => import('@/views/health/index'),
      meta: {
        title: '健康登记',
        icon: 'form',
        roles: ['0']
      }
    }]
  },
  {
    path: '/student-table',
    component: Layout,
    meta: {roles: ['1']},
    children: [{
      path: 'student-table',
      name: 'student-table',
      component: () => import('@/views/teacher/student-manage'),
      meta: {
        title: '学生信息管理',
        icon: 'form',
        roles: ['1']
      }
    }]
  },
  {
    path: '/assessment-table',
    component: Layout,
    meta: {roles: ['1']},
    children: [{
      path: 'assessment-table',
      name: 'assessment-table',
      component: () => import('@/views/teacher/assessment-table'),
      meta: {
        title: '综合测评审核',
        icon: 'form',
        roles: ['1']
      }
    }]
  },
  {
    path: '/rewards-table',
    component: Layout,
    meta: {roles: ['1']},
    children: [{
      path: 'rewards-table',
      name: 'rewards-table',
      component: () => import('@/views/teacher/rewards-table'),
      meta: {
        title: '奖扣分表格详情',
        icon: 'form',
        roles: ['1']
      }
    }]
  },
  {
    path: '/apply-table',
    component: Layout,
    meta: {roles: ['1']},
    children: [{
      path: 'apply-table',
      name: 'apply-table',
      component: () => import('@/views/teacher/apply-table'),
      meta: {
        title: '贫困申请审核',
        icon: 'form',
        roles: ['1']
      }
    }]
  },
  {
    path: '/health-table',
    component: Layout,
    meta: {roles: ['1']},
    children: [{
      path: 'health-table',
      name: 'health-table',
      component: () => import('@/views/teacher/health-table'),
      meta: {
        title: '学生健康信息',
        icon: 'form',
        roles: ['1']
      }
    }]
  },
   // 404 page must be placed at the end !!!
   {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


//实例化vue的时候只挂载constantRouter
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
