<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToolbarComp from "@/components/toolbar.component.vue";
import FooterComp from "@/components/footer.component.vue";
</script>

<template>
    <header>
        <toolbar-comp></toolbar-comp>
    </header>
    <main>
        <RouterView />
    </main>
    <footer>
        <footer-comp></footer-comp>
    </footer>
</template>

<style scoped>
</style>
