<script setup lang="ts">
// @ts-ignore
import VueCal from "vue-cal";
import { useAuthStore } from "~~/stores/auth";

definePageMeta({
  layout: "dashboard",
});

const auth = useAuthStore();

const events = ref([
  {
    start: "2022-11-09 10:30",
    end: "2022-11-09 11:30",
    title: "Doctor appointment",
    class: "bg-red-300",
  },
]);

function handleEventClick(event, e) {
  e.stopPropagation();
  console.log(event);
}
</script>

<template>
  <div class="p-5">
    <div style="height: 720px" v-if="auth.user.accountType === 'DOCTOR'">
      <VueCal
        :time-from="6 * 60"
        :time-to="20 * 60"
        :events="events"
        :on-event-click="handleEventClick"
        events-on-month-view="short"
        hide-weekends
      ></VueCal>
    </div>
    <div v-else>Patient Dash</div>
  </div>
</template>
