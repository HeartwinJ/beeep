<script setup lang="ts">
import { Appointment } from ".prisma/client";
import { useAuthStore } from "~~/stores/auth";
import { useDoctorsStore } from "~~/stores/doctors";
import { PlusIcon, MoodSadIcon } from "vue-tabler-icons";

definePageMeta({
  layout: "dashboard",
});

const auth = useAuthStore();
const doctorsStore = useDoctorsStore();

const isLoading = ref(true);
const showNew = ref(false);
const showDetails = ref(false);
const currentAppointmentId = ref("");

onMounted(async () => {
  await doctorsStore.getDoctors();
  isLoading.value = false;
});

function showDiagnosis(appointmentId: string) {
  currentAppointmentId.value = appointmentId;
  showDetails.value = true;
}
</script>

<template>
  <div class="p-5" v-if="!isLoading">
    <div class="space-y-8">
      <div class="flex justify-between">
        <div class="text-2xl font-medium">My Appointments</div>
        <button
          class="flex items-center gap-2 rounded-lg bg-green-600 px-2 py-1 text-white hover:bg-green-500"
          @click="showNew = true"
        >
          <PlusIcon />
          <span class="font-medium">New Appointment</span>
        </button>
      </div>
      <div
        class="grid grid-cols-3 gap-2"
        v-if="(auth.user.appointments as Appointment[]).length"
      >
        <AppointmentCard
          :appointment="appointment"
          v-for="appointment in auth.user.appointments as Appointment[]"
          @open="showDiagnosis(appointment.id)"
        />
      </div>
      <div
        class="flex flex-col items-center justify-center gap-4 py-24 text-gray-400"
        v-else
      >
        <MoodSadIcon size="48" />
        <div>Oops! No Appointments.</div>
      </div>
    </div>
    <NewAppointment v-if="showNew" @close="showNew = false" />
    <AppointmentDetails
      v-if="showDetails"
      :appointmentId="currentAppointmentId"
      @close="showDetails = false"
    />
  </div>
</template>
