<script setup lang="ts">
import {
  LogoutIcon,
  UserIcon,
  ClipboardCheckIcon,
  StethoscopeIcon,
} from "vue-tabler-icons";
import { useAuthStore } from "~~/stores/auth";

const auth = useAuthStore();

const showProfile = ref(false);
</script>
<template>
  <div>
    <div class="flex h-16 justify-between p-4">
      <div class="flex items-center gap-2">
        <img src="/img/logo.svg" class="h-12 w-12" />
        <span class="text-2xl uppercase tracking-widest">Beeep</span>
      </div>
      <div class="flex gap-10" v-if="auth.user.accountType === 'PATIENT'">
        <div class="flex items-center" active-class="font-bold border-b-4 p-2">
          <ClipboardCheckIcon />
          <router-link
            to="/patient/appointments"
            active-class="font-bold border-b-4 p-2"
            >Appointments</router-link
          >
        </div>
        <div class="flex items-center gap-2">
          <StethoscopeIcon />
          <router-link
            to="/patient/recordings"
            active-class="font-bold border-b-4 p-2"
            >Recordings</router-link
          >
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="flex items-center gap-2 rounded-lg p-2 font-bold text-blue-600 hover:bg-blue-100"
          @click="showProfile = true"
        >
          {{ auth.user.name }}
          <UserIcon />
        </button>
        <button
          class="rounded-lg p-2 text-red-600 hover:bg-red-100"
          @click="auth.logout()"
        >
          <LogoutIcon />
        </button>
      </div>
    </div>
    <ProfileDetails
      v-if="showProfile"
      :user="auth.user"
      @close="showProfile = false"
    />
  </div>
</template>
