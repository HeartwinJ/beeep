<script setup lang="ts">
import { Appointment } from "@prisma/client";
import dayjs from "dayjs";

interface Props {
  appointment: Appointment;
}

const props = defineProps<Props>();
</script>
<template>
  <div
    class="rounded-lg border-l-4 border-red-600 bg-white p-2 shadow"
    :class="{
      'border-green-600': props.appointment.status === 'COMPLETE',
      'border-yellow-600': props.appointment.status === 'NEW',
      'border-red-600': props.appointment.status === 'CANCELLED',
    }"
  >
    <div class="text-lg font-medium">
      {{ props.appointment.title }}
    </div>
    <div class="text-sm text-gray-500">
      {{ dayjs(props.appointment.startTime).format("ddd D MMM, YYYY") }}
    </div>
  </div>
</template>
