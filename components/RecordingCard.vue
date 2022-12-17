<script setup lang="ts">
import { Recording } from "@prisma/client";
import dayjs from "dayjs";

interface Props {
  recording: Recording;
}

const props = defineProps<Props>();
</script>

<template>
  <!-- visualizer here with the url attached -->
  <div class="rounded-lg bg-white border-sm p-5 shadow flex items-center">
    <div class="px-4">
    {{
      dayjs(props.recording.createdAt).format("ddd D MMM, YYYY- hh : mm : ss")
    }}
    </div>
    <av-waveform 
      audio-src="{{ props.recording.url }}"
    ></av-waveform>
  </div>

</template>
