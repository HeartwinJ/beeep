import { defineStore } from "pinia";
import { Doctor } from "@prisma/client";

export const useDoctorsStore = defineStore("doctors", {
  state: () => ({
    doctors: [] as Doctor[],
  }),
  actions: {
    async getDoctors() {
      // @ts-ignore
      this.doctors = (await $fetch("/api/doctors", { method: "GET" })).doctors;
    },
    getDocById(docId: string) {
      return this.doctors.find((el) => el.id === docId);
    },
  },
});
