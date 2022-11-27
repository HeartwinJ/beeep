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
    <div class="z-50 rounded-lg bg-white p-5 w-full max-w-lg">
      <div class="flex justify-between items-center mb-5 gap-4">
        <div class="text-xl font-medium">Diagnosis Details</div>
        <div class="text-sm font-normal">
        {{
          dayjs(diagnosisData?.appointment.startTime).format(
            "ddd D MMM, YYYY"
          )
        }}
        </div>
      </div>
      <div class="flex gap-2">
        <DiagnosisDetails title="Doctor" class="grow m-2 text-sm">
          <div >
            {{ diagnosisData?.doctor.name }}
          </div>
          <div>
            {{ diagnosisData?.doctor.specialization }}
          </div>
        </DiagnosisDetails>
        <DiagnosisDetails title="Patient" class="grow  m-2 text-sm">
          <div>
            {{ diagnosisData?.patient.name }}
          </div>
          <div>
            {{
          dayjs(diagnosisData?.patient.dob).format(
            "D MMM, YYYY"
          )
        }}
          </div>
        </DiagnosisDetails>
      </div>

      <DiagnosisDetails title="Symptoms" class=" m-2 text-sm">
          <div>
            {{ diagnosisData?.symptoms }}
          </div>
        </DiagnosisDetails>
        <DiagnosisDetails title="Findings" class=" m-2 text-sm">
          <div>
            {{ diagnosisData?.findings }}
          </div>
        </DiagnosisDetails>
        <DiagnosisDetails title="Prescription" class=" m-2 text-sm">
          <div>
            {{ diagnosisData?.prescription }}
          </div>
        </DiagnosisDetails>
        <DiagnosisDetails title="Ailment" class=" m-2 text-sm">
          <div>
            {{ diagnosisData?.ailment }}
          </div>
        </DiagnosisDetails>
    </div>
  </div>
</template>
