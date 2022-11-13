<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";

const auth = useAuthStore();

const accountType = ref("PATIENT");
const formData = reactive({
  email: "",
  password: "",
});

async function handleLogin() {
  const success = await auth.authenticate(
    accountType.value,
    formData.email,
    formData.password
  );

  if (success) {
    await navigateTo("/");
  }

  formData.email = "";
  formData.password = "";
}
</script>
<template>
  <div class="flex h-full w-full items-center justify-center bg-gray-50">
    <div
      class="flex w-full max-w-2xl overflow-hidden rounded-lg border bg-white shadow"
    >
      <div class="grow p-5">
        <div class="mb-5 text-xl">Welcome back!</div>
        <AccountSelector
          :accountType="accountType"
          @update="accountType = $event"
        />
        <FormKit
          type="form"
          :actions="false"
          @submit="handleLogin"
          v-model="formData"
        >
          <FormKit type="email" name="email" label="Email" />
          <FormKit type="password" name="password" label="Password" />
          <div class="mt-5 flex flex-col items-center justify-center">
            <FormKit type="submit" label="Login" />
            <div class="font-light" v-if="accountType === 'PATIENT'">
              or
              <router-link
                to="/register"
                class="cursor-pointer font-normal hover:text-blue-600"
              >
                Register
              </router-link>
            </div>
          </div>
        </FormKit>
      </div>
      <div
        class="bg-cover pl-72"
        style="background-image: url('/img/loginBg.jpg')"
      ></div>
    </div>
  </div>
</template>
