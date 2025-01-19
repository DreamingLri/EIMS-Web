import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Root",
      component: () => import("@/layout/HomeLayout.vue"),
      children: [
        {
          path: "",
          name: "Home",
          components: {
            default: () => import("@/views/Home.vue"),
          },
        },
      ],
    },
    {
      path: "/index",
      name: "IndexRoot",
      component: () => import("@/layout/HomeLayout.vue"),
      children: [
        {
          path: "",
          name: "Index",
          redirect: { name: "Customer" },
        },
        {
          path: "customer",
          name: "Customer",
          components: {
            default: () => import("@/views/Customers.vue"),
            sidebar: () => import("@/components/Sidebar.vue"),
            header: () => import("@/components/Header.vue"),
          },
        },{
          path: "department",
          name: "Department",
          components: {
            default: () => import("@/views/Departments.vue"),
            sidebar: () => import("@/components/Sidebar.vue"),
            header: () => import("@/components/Header.vue"),
          },
        },{
          path: "employee",
          name: "Employee",
          components: {
            default: () => import("@/views/Employees.vue"),
            sidebar: () => import("@/components/Sidebar.vue"),
            header: () => import("@/components/Header.vue"),
          },
        }, {
          path: "management",
          name: "Management",
          components: {
            default: () => import("@/views/Management.vue"),
            sidebar: () => import("@/components/Sidebar.vue"),
            header: () => import("@/components/Header.vue"),
          }
        }, {
          path: "search",
          name: "Search",
          components: {
            default: () => import("@/views/Search.vue"),
            sidebar: () => import("@/components/Sidebar.vue"),
            header: () => import("@/components/Header.vue"),
          }
        }
      ],
    },
  ],
});

export default router;
