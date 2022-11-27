<script setup lang="ts">
import dayjs from "dayjs";
import { useAuthStore } from "~~/stores/auth";

const props = defineProps({
  appointmentId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const auth = useAuthStore();
</script>
<template>
  <div class="fixed inset-0 z-10 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30" @click="emit('close')"></div>
    <div class="z-50 rounded-lg bg-white p-5">
      <div class="mb-5 text-xl font-medium">Diagnosis Details</div>
      <div>{{ props.appointmentId }}</div>
    </div>
  </div>
</template>
