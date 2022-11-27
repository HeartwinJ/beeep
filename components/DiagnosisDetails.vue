<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
});
</script>
<template>
    <div class="bg-slate-100 rounded-lg p-3 mb-2">
       <div class="text-lg font-semibold ">
        {{ props.title }}
    </div>
    <div>
        <slot></slot>
    </div> 
    </div>    
</template>