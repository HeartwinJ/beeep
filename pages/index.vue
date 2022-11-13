<script setup lang="ts">
import dayjs from "dayjs";
import { useAuthStore } from "~~/stores/auth";
import { useDoctorsStore } from "~~/stores/doctors";

definePageMeta({
  layout: "dashboard",
});

const auth = useAuthStore();
const doctorsStore = useDoctorsStore();

const isLoading = ref(true);

const events = computed(() =>
  auth.user.appointments!.map((el) => ({
    id: el.id,
    start: dayjs(el.startTime).format("YYYY-MM-DD H:mm"),
    end: dayjs(el.endTime).format("YYYY-MM-DD H:mm"),
    title: el.title,
    class: "bg-red-300",
  }))
);

console.log(auth.user.appointments, events.value);

onMounted(async () => {
  await doctorsStore.getDoctors();
  isLoading.value = false;
});
</script>

<template>
  <div class="p-5" v-if="!isLoading">
    <DoctorDash :events="events" v-if="auth.user.accountType === 'DOCTOR'" />
    <PatientDash :appointments="auth.user.appointments" v-else />
  </div>
</template>
