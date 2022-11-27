<template>
  <div class="flex h-screen w-screen flex-col bg-gray-50 px-8">
    <Header />
    <div class="grow">
      <slot></slot>
    </div>
  </div>
</template>
