<script setup lang="ts">
import { Recording } from "@prisma/client";
import { useAuthStore } from "~~/stores/auth";
import { useDoctorsStore } from "~~/stores/doctors";
import { MoodSadIcon } from "vue-tabler-icons";

definePageMeta({
  layout: "dashboard",
});

const auth = useAuthStore();
const doctorsStore = useDoctorsStore();

const isLoading = ref(true);
const recordings = ref<Recording[]>([] as Recording[]);

onMounted(async () => {
  await doctorsStore.getDoctors();
  recordings.value = (
    await $fetch(`/api/recordings/${auth.user.id}`, {
      method: "GET",
      headers: {
        authorization: auth.token,
      },
    })
  ).recordings as Recording[];

  isLoading.value = false;
});
</script>

<template>
  <div class="p-5" v-if="!isLoading">
    <div class="space-y-8">
      <div class="text-2xl font-medium">My Recordings</div>
      <div class="grid grid-cols-3 gap-2" v-if="recordings?.length">
        <RecordingCard v-for="recording in recordings" :recording="recording" />
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
</template>
