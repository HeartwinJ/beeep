<script setup lang="ts">
import { Appointment, Patient, Doctor } from "@prisma/client";
definePageMeta({
  layout: "dashboard",
});

const route = useRoute();

const isLoading = ref(true);
const appointmentData = ref(
  {} as Appointment & { patient: Patient; doctor: Doctor }
);
const formData = reactive({
  symptoms: "",
  prescription: "",
  ailment: "",
});

onMounted(async () => {
  // @ts-ignore
  appointmentData.value = (
    await $fetch(`/api/appointments/${route.query.appointmentId}`, {
      method: "GET",
    })
  ).appointment!;

  isLoading.value = false;
});

async function handleSubmit() {
  await $fetch("/api/diagnoses", {
    method: "POST",
    body: {
      docId: appointmentData.value.docId,
      patientId: appointmentData.value.patientId,
      appointmentId: appointmentData.value.id,
      symptoms: formData.symptoms,
      prescription: formData.prescription,
      ailment: formData.ailment,
      report: "",
    },
  });

  await navigateTo("/");
}

async function handleCancel() {
  await navigateTo("/");
}
</script>
<template>
  <div v-if="isLoading" class="flex items-center justify-center">
    Loading...
  </div>
  <div class="flex p-5" v-else>
    <div class="grow">
      <div class="mb-5 text-xl font-bold">Patient Details</div>
      <div>{{ appointmentData.patient.name }}</div>
      <div>Patient Details</div>
    </div>
    <div class="grow">
      <FormKit
        type="form"
        :actions="false"
        @submit="handleSubmit"
        v-model="formData"
      >
        <FormKit type="textarea" name="symptoms" label="Symptoms" />
        <div class="mb-2">
          <div class="mb-1 text-sm">Device</div>
          <iframe src="https://google.com" class="w-full"></iframe>
        </div>
        <FormKit type="textarea" name="prescription" label="Prescription" />
        <FormKit type="text" name="ailment" label="Ailment" />
        <div class="mt-5 flex justify-end gap-2">
          <FormKit
            type="button"
            label="Cancel"
            outer-class="mb-0"
            input-class="$reset bg-red-100 hover:bg-red-200 text-red-600 text-sm font-normal py-3 px-5 rounded border border-red-400"
            @click="handleCancel"
          />
          <FormKit type="submit" label="Submit" outer-class="mb-0" />
        </div>
      </FormKit>
    </div>
  </div>
</template>
