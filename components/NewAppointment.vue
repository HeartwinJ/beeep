<script setup lang="ts">
import dayjs from "dayjs";
import { useDoctorsStore } from "~~/stores/doctors";
import { useAuthStore } from "~~/stores/auth";

const emit = defineEmits(["close"]);

const doc = useDoctorsStore();
const auth = useAuthStore();

const doctorsList = computed(() =>
  doc.doctors.map((el) => ({ label: el.name, value: el.id }))
);
const formData = reactive({
  title: "",
  docId: doctorsList.value[0].value,
  startTime: "",
  endTime: "",
});

async function handleSubmit() {
  const res = await $fetch("/api/appointments", {
    method: "POST",
    headers: {
      authorization: auth.token,
    },
    body: {
      startTime: dayjs(formData.startTime).toISOString(),
      endTime: dayjs(formData.endTime).toISOString(),
      status: "NEW",
      title: formData.title,
      docId: formData.docId,
      patientId: auth.user.id,
    },
  });

  if (res.success) {
    await auth.refreshAppointments();
    emit("close");

    formData.title = "";
    formData.docId = doctorsList.value[0].value;
    formData.startTime = "";
    formData.endTime = "";
  } else {
    formData.startTime = "";
    formData.endTime = "";
  }
}
</script>
<template>
  <div class="fixed inset-0 z-10 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30" @click="emit('close')"></div>
    <div class="z-50 rounded-lg bg-white p-5">
      <div class="mb-5 text-xl font-medium">New Appointment</div>
      <FormKit
        type="form"
        :actions="false"
        @submit="handleSubmit"
        v-model="formData"
      >
        <FormKit type="text" name="title" label="Title" />
        <FormKit
          type="select"
          name="docId"
          label="Doctor"
          :options="doctorsList"
        />
        <FormKit type="datetime-local" name="startTime" label="Start Time" />
        <FormKit type="datetime-local" name="endTime" label="End Time" />
        <div class="mt-5 flex justify-center">
          <FormKit type="submit" label="Book Appointment" />
        </div>
      </FormKit>
    </div>
  </div>
</template>
