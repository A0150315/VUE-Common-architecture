import Vue, { AsyncComponent } from "vue";
import Router, { RouteConfig } from "vue-router";
// import Router, { Route, NavigationGuard } from 'vue-router'
const Home: AsyncComponent = (): any => import("../components/Home/Home.vue");

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router: Router = new Router({
  mode: "history",
  base: "/",
  routes
});

export default router;