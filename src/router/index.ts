import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ListView from "@/components/ListView.vue";
import CardView from "@/components/CardView.vue";
import AddNewDeviceView from "@/views/AddNewDeviceView.vue";
import EditDeviceView from "@/views/EditDeviceView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add-new",
      name: "add-new",
      component: AddNewDeviceView,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditDeviceView,
    },
  ],
});

export default router;
