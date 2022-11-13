import { useAuthStore } from "~~/stores/auth";

const ALLOWED_ROUTES = [/^\/login\/?$/, /^\/register\/?$/];

export default defineNuxtRouteMiddleware((to, from) => {
  if (ALLOWED_ROUTES.some((route) => route.test(to.fullPath))) {
    return;
  }
  const auth = useAuthStore();

  if (!auth.isAuthenticated) {
    return navigateTo("/login");
  }
});
