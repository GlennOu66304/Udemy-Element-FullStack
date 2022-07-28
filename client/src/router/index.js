import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Welcome from "../views/Welcome.vue";
import Funds from "../views/Funds.vue";
import Info from "../views/Info.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/home",
  //   redirect: "/",
  // },
  {
    path: "/",
    name: "login",
    component: Login,
  },

  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: Welcome,
      },
      {
        path: "/funds",
        name: "funds",
        component: Funds,
      },
      {
        path: "/info",
        name: "info",
        component: Info,
      },
    ],
  },
];

// initainl a new vue Router
const router = new VueRouter({
  mode: "hash",
  //   base: process.env.BASE_URL,
  routes,
});

// // private router guard
router.beforeEach((to, from, next) => {
  // condition check, if the local storage has the jwt_token
  const isLogin = window.sessionStorage.token ? true : false;

  //if the router path is login, then just head to the login path
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    // else, check if it localstorage contains the token, yes go to the dash board page, other wise go back to the login page
    isLogin ? next() : next("/login");
  }
});

export default router;
