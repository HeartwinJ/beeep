<script setup lang="ts">
import dayjs from "dayjs";
import { useAuthStore } from "~~/stores/auth";

const auth = useAuthStore();

const formData = reactive({
  name: "",
  dob: "",
  gender: "",
  mobileNum: "",
  email: "",
  password: "",
});

async function handleRegister() {
  const success = await auth.register({
    name: formData.name,
    dob: dayjs(formData.dob),
    gender: formData.gender,
    mobileNum: formData.mobileNum,
    email: formData.email,
    password: formData.password,
  });

  if (success) {
    await navigateTo("/");
  }

  formData.name = "";
  formData.dob = "";
  formData.gender = "";
  formData.mobileNum = "";
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
        <div class="mb-5 text-xl">Register</div>
        <FormKit
          type="form"
          :actions="false"
          @submit="handleRegister"
          v-model="formData"
        >
          <FormKit type="text" name="name" label="Name" />
          <FormKit type="date" name="dob" label="Date of birth" />
          <FormKit
            type="radio"
            name="gender"
            label="Gender"
            :options="['Male', 'Female']"
          />
          <FormKit type="tel" name="mobileNum" label="Mobile Number" />
          <FormKit type="email" name="email" label="Email" />
          <FormKit type="password" name="password" label="password" />
          <div class="mt-5 flex flex-col items-center justify-center">
            <FormKit type="submit" label="Register" outer-class="mb-0" />
            <div class="font-light">
              or
              <router-link
                to="/login"
                class="cursor-pointer font-normal hover:text-blue-600"
              >
                go back
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
