<script setup lang="ts">
import { User } from "~~/stores/auth";

interface Props {
  user: User;
}

const props = defineProps<Props>();
const emit = defineEmits(["close"]);
</script>
<template>
  <div class="fixed inset-0 z-10 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/30" @click="emit('close')"></div>
    <div class="z-50 rounded-lg bg-white p-5">
      <div>{{ props.user.name }}</div>
      <div>{{ props.user.email }}</div>
    </div>
  </div>
</template>
