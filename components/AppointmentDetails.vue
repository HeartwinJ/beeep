<script setup lang="ts">
import dayjs from "dayjs";
import { useAuthStore } from "~~/stores/auth";
import { Diagnosis, Doctor, Patient, Appointment } from "prisma/prisma-client";

const props = defineProps({
  appointmentId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const auth = useAuthStore();

const diagnosisData = ref<
  | (Diagnosis & {
      doctor: Doctor;
      patient: Patient;
      appointment: Appointment;
    })
  | undefined
>();

onMounted(async () => {
  const diagnosis = (
    await $fetch(`/api/diagnoses/${props.appointmentId}`, {
      headers: { authorization: auth.token },
    })
  ).diagnosis;
  diagnosisData.value = diagnosis;
});
</script>
<template>
  <div class="fixed inset-0 z-10 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30" @click="emit('close')"></div>
    <div class="z-50 rounded-lg bg-white p-5">
      <div class="mb-5 text-xl font-medium">Diagnosis Details</div>
      <pre class="h-48 overflow-y-auto">{{ diagnosisData }}</pre>
    </div>
  </div>
</template>
