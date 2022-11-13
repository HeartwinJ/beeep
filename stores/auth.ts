import { defineStore } from "pinia";
import dayjs from "dayjs";

export interface User {
  accountType: string;
  id: string;
  name: string;
  gender: string;
  dob: dayjs.Dayjs;
  mobileNum?: string;
  specialization?: string;
  email: string;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
  appointments?: Array<any>;
  diagnoses?: Array<any>;
}

export interface PatientData {
  name: string;
  dob: dayjs.Dayjs;
  gender: string;
  mobileNum: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: {} as User,
  }),
  actions: {
    setUser(_data: User) {
      this.user = { ..._data };
    },
    async authenticate(accountType: string, email: string, password: string) {
      const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: { accountType, email, password },
      });
      if (res.success) {
        this.isAuthenticated = true;
        this.setUser({
          accountType: res.user!.accountType,
          id: res.user!.id,
          name: res.user!.name,
          gender: res.user!.gender,
          dob: dayjs(res.user!.dob),
          email: res.user!.email,
          createdAt: dayjs(res.user!.createdAt),
          updatedAt: dayjs(res.user!.updatedAt),
          mobileNum: res.user!.mobileNum || null,
          specialization: res.user!.specialization || null,
          appointments: res.user!.appointments || [],
          diagnoses: res.user!.diagnoses || [],
        });
        return true;
      }
      return false;
    },
    async register(patientData: PatientData) {
      const res = await $fetch("/api/auth/register", {
        method: "POST",
        body: {
          name: patientData.name,
          dob: patientData.dob.toISOString(),
          gender: patientData.gender,
          mobileNum: parseInt(patientData.mobileNum),
          email: patientData.email,
          password: patientData.password,
        },
      });
      if (res.success) {
        await navigateTo("/login");
        return true;
      }
      return false;
    },
    async logout() {
      this.$reset();
      await navigateTo("/login");
    },
  },
});
