<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from "@/components/header.component.vue";
import FooterComponent from "@/components/footer.component.vue";
</script>

<template>
    <div class="card">
            <header>
                <header-component></header-component>
            </header>
            <main>
                <RouterView />
            </main>
    </div>


    <footer>
        <footer-component></footer-component>
    </footer>
</template>

<style scoped>
</style>
