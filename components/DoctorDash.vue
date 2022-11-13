<script setup lang="ts">
// @ts-ignore
import VueCal from "vue-cal";

const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});

console.log(props.events);

async function handleEventClick(event: any, e: any) {
  e.stopPropagation();
  await navigateTo({ path: "/diagnosis", query: { appointmentId: event.id } });
}
</script>
<template>
  <div style="height: 720px">
    <VueCal
      :time-from="6 * 60"
      :time-to="20 * 60"
      :events="props.events"
      :on-event-click="handleEventClick"
      events-on-month-view="short"
      hide-weekends
    ></VueCal>
  </div>
</template>
