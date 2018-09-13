import Vue, { AsyncComponent } from "vue";
import Router, { RouteConfig } from "vue-router";
import store from "../store";
// import Router, { Route, NavigationGuard } from 'vue-router'
const Index: AsyncComponent = (): any => import("../pages/Index/Index.vue");

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    // component: Home,
    redirect: "/index"
  },
  {
    path: "/index",
    name: "Index",
    component: Index
  }
];

const router: Router = new Router({
  mode: "history",
  base: "/",
  routes
});

router.beforeEach((to, from, next) => {
  if (/^\/index\/calling(?:\/(?=$))?$/i.test(to.path)) {
    if (/^\/index(?:\/(?=$))?$/i.test(from.path)) {
      window.setTimeout(() => {
        router.back();
      }, 5000);
    } else {
      window.setTimeout(() => {
        router.replace("/index");
      }, 5000);
    }
  }
  store.dispatch("changeRouterState", true);
  next();
});

router.afterEach((to, from) => {
  setTimeout(() => {
    store.dispatch("changeRouterState", false);
  }, 500);
});

export default router;
