import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  if (to.fullPath == "/") {
    if (auth.user.accountType === "DOCTOR") {
      return navigateTo("/doctor");
    } else {
      return navigateTo("/patient/appointments");
    }
  }
});
