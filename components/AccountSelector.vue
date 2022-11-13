<script setup lang="ts">
const props = defineProps({
  accountType: {
    type: String,
    default: "PATIENT",
  },
});
const emit = defineEmits(["update"]);
</script>
<template>
  <div class="mb-5 flex justify-between">
    <button
      class="grow px-4 py-2"
      :class="{
        'border-b border-blue-600 text-blue-600':
          props.accountType === 'PATIENT',
        'text-gray-400': props.accountType !== 'PATIENT',
      }"
      @click="emit('update', 'PATIENT')"
    >
      Patient
    </button>
    <button
      class="grow px-4 py-2"
      :class="{
        'border-b border-blue-600 text-blue-600':
          props.accountType === 'DOCTOR',
        'text-gray-400': props.accountType !== 'DOCTOR',
      }"
      @click="emit('update', 'DOCTOR')"
    >
      Doctor
    </button>
  </div>
</template>
