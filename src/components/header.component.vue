<template>
    <p class="font-bold text-4xl">Posts App</p>
    <pv-tab-menu :model="items" />
</template>

<script setup lang="ts">

import {ref} from "vue";

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        to: '/'
    },
    {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        to: '/users'
    },
    {

        label: 'Posts',
        icon: 'pi pi-fw pi-table',
        to: '/posts'
    },
    {
        label: 'Documentation',
        icon: 'pi pi-fw pi-file',
        to: '/documentation'
    },
    {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        to: '/settings'
    }
]);

</script>

<script lang="ts">
export default {
    name: "HeaderComponent"
}

</script>

<style scoped>

</style>