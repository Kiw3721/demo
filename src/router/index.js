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
 */
export const constantRoutes = [{
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
    path: '/404',
    component: () => import('@/views/404'),
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
        title: '个人中心',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/assessment',
    component: Layout,
    redirect: '/assessment/table',
    name: 'Assessment',
    meta: {
      title: '综合测评',
      icon: 'el-icon-s-help'
    },
    children: [{
        path: 'table',
        name: 'Table',
        component: () => import('@/views/assessment/table'),
        meta: {
          title: '综合测评表',
          icon: 'table'
        }
      },
      {
        path: 'rewards',
        name: 'Rewards',
        component: () => import('@/views/assessment/rewards'),
        meta: {
          title: '奖扣分来源表',
          icon: 'table'
        },
        children: [{
            path: 'moral',
            component: () => import('@/views/assessment/moral'),
            name: 'moral',
            meta: {
              title: '思想分'
            }
          },
          {
            path: 'study',
            component: () => import('@/views/assessment/study'),
            name: 'study',
            meta: {
              title: '学业分'
            }
          },
          {
            path: 'sport',
            component: () => import('@/views/assessment/sport'),
            name: 'sport',
            meta: {
              title: '文体分'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    children: [{
      path: 'apply',
      name: 'Apply',
      component: () => import('@/views/apply/index'),
      meta: {
        title: '贫困申请',
        icon: 'form'
      }
    }]
  },
  {
    path: '/health',
    component: Layout,
    children: [{
      path: 'health',
      name: 'health',
      component: () => import('@/views/health/index'),
      meta: {
        title: '健康登记',
        icon: 'form'
      }
    }]
  },
  {
    path: '/table',
    component: Layout,
    children: [{
      path: 'table',
      name: 'table',
      component: () => import('@/views/table/index'),
      meta: {
        title: '表单',
        icon: 'form'
      }
    }]
  },
  // {
  //   path: '/complex-table',
  //   component: Layout,
  //   children: [{
  //     path: 'complex-table',
  //     name: 'complex-table',
  //     component: () => import('@/views/table/complex-table'),
  //     meta: {
  //       title: '可操作的表单',
  //       icon: 'form'
  //     }
  //   }]
  // },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

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
