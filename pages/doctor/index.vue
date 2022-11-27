<script setup lang="ts">
import dayjs from "dayjs";
import { useAuthStore } from "~~/stores/auth";

definePageMeta({
  layout: "dashboard",
});

const auth = useAuthStore();

const events = computed(() =>
  auth.user.appointments!.map((el) => ({
    id: el.id,
    start: dayjs(el.startTime).format("YYYY-MM-DD H:mm"),
    end: dayjs(el.endTime).format("YYYY-MM-DD H:mm"),
    title: el.title,
    class: "bg-red-300",
  }))
);
</script>

<template>
  <div class="p-5">
    <DoctorDash :events="events" v-if="auth.user.accountType === 'DOCTOR'" />
  </div>
</template>
