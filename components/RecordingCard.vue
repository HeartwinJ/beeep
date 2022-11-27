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
  <div class="text-sm text-gray-500">
    <av-waveform
      audio-src="{{ props.recording.url }}"
    ></av-waveform>
    {{
      dayjs(props.recording.createdAt).format("ddd D MMM, YYYY- hh : mm : ss")
    }}
  </div>

</template>
