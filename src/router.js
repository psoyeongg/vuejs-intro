import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/home";
import Products from "./views/Products";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/products",
      component: Products,
    },
  ],
});

export default router;
