<script setup lang="ts">
import { Recording } from "@prisma/client";
import dayjs from "dayjs";

interface Props {
  recordnf: Recording;
}

const props = defineProps<Props>();
</script>

<template>
  <!-- visualizer here with the url attached -->
  <div class="text-sm text-gray-500">
    {{ props.recordnf.url }}
    {{
      dayjs(props.recordnf.createdAt).format("ddd D MMM, YYYY- hh : mm : ss")
    }}
  </div>
</template>
