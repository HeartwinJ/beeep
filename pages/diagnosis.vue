<script setup lang="ts">
import { Appointment, Patient, Doctor, Recording } from "@prisma/client";
import { useAuthStore } from "~~/stores/auth";
import dayjs from "dayjs";
import { MoodSadIcon } from "vue-tabler-icons";

definePageMeta({
  layout: "dashboard",
});

const auth = useAuthStore();

const route = useRoute();

const isLoading = ref(true);
const appointmentData = ref(
  {} as Appointment & { patient: Patient; doctor: Doctor }
);
const recordings = ref<Recording[]>([] as Recording[]);

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
      headers: {
        authorization: auth.token,
      },
    })
  ).appointment!;
  recordings.value = (
    await $fetch(`/api/recordings/${appointmentData.value.patientId}`, {
      method: "GET",
      headers: {
        authorization: auth.token,
      },
    })
  ).recordings as Recording[];

  isLoading.value = false;
});

async function handleSubmit() {
  await $fetch("/api/diagnoses", {
    method: "POST",
    headers: {
      authorization: auth.token,
    },
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
    <div class="w-max-50 w-full">
      <div class="mb-5 text-xl font-bold">Patient Details</div>
      <div class="pb-3 pr-8">
        <DiagnosisDetails title="Name">{{
          appointmentData.patient.name
        }}</DiagnosisDetails>
        <DiagnosisDetails title="Date of Birth">{{
          dayjs(appointmentData.patient.dob).format("D MMM, YYYY")
        }}</DiagnosisDetails>

        <DiagnosisDetails title="Gender">{{
          appointmentData.patient.gender
        }}</DiagnosisDetails>
        <DiagnosisDetails title="Mobile Number">{{
          appointmentData.patient.mobileNum
        }}</DiagnosisDetails>
      </div>

      <div class="pr-8" v-if="!isLoading">
        <div class="pb-2 font-semibold">Recordings</div>
        <div
          class="flex flex-col items-center justify-center gap-5"
          v-if="recordings?.length"
        >
          <RecordingCard
            v-for="recording in recordings"
            :recording="recording"
            class="p-5"
          />
        </div>
        <div
          class="flex flex-col items-center justify-center gap-4 py-24 text-gray-400"
          v-else
        >
          <MoodSadIcon size="48" />
          <div>Oops! No Recordings.</div>
        </div>
      </div>
    </div>
    <div class="w-max-50 w-full">
      <FormKit
        type="form"
        :actions="false"
        @submit="handleSubmit"
        v-model="formData"
      >
        <FormKit type="textarea" name="symptoms" label="Symptoms" />
        <FormKit type="textarea" name="findings" label="Findings" />
        <FormKit type="text" name="ailment" label="Ailment" />
        <FormKit type="textarea" name="prescription" label="Prescription" />
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
