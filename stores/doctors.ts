import { defineStore } from "pinia";
import { Doctor } from "@prisma/client";
import { useAuthStore } from "~~/stores/auth";

export const useDoctorsStore = defineStore("doctors", {
  state: () => ({
    doctors: [] as Doctor[],
  }),
  actions: {
    async getDoctors() {
      const auth = useAuthStore();
      // @ts-ignore
      this.doctors = (
        await $fetch("/api/doctors", {
          method: "GET",
          headers: {
            Authorization: auth.token,
          },
        })
      ).doctors;
    },
    getDocById(docId: string) {
      return this.doctors.find((el) => el.id === docId);
    },
  },
});
