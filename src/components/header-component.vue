<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FrontEndRoutes } from '@/constants'
import { useUserStore } from '@/stores/user-store'

const userStore = useUserStore()
</script>

<template>
    <header>
        <nav v-if="userStore.user.isEmpty()">
            <router-link :to="FrontEndRoutes.Auth">Auth</router-link>
            <router-link :to="FrontEndRoutes.Register">Register</router-link>
        </nav>
        <nav v-else>
            <router-link :to="FrontEndRoutes.Home">Home</router-link>
            <router-link :to="FrontEndRoutes.Write">Write</router-link>
            <button @click="userStore.logout">Logout</button>
        </nav>
    </header>
</template>

<style scoped>
nav {
    @apply flex flex-row gap-x-3;
}
</style>
