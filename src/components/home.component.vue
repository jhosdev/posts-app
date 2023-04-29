<template>
    <p>Basic CRUD app with Vue.js and TypeScript using a fake api:</p>
    <pv-button label="https://jsonplaceholder.typicode.com/" link/>
    <br>
    <p class="font-bold">Key Features:</p>
    <ul>
        <li>CRUD (Create, Read, Update, and Delete) functionality for posts data <span class="font-bold">[Posts Tab]</span></li>
    </ul>
    <br>
    <p class="font-bold">Future Features:</p>
    <ul>
        <li>Translation functionality</li>
        <li>User login & authentication <span class="font-bold">[User Tab]</span></li>
        <li>API Tracking <span class="font-bold">[Documentation Tab]</span></li>
        <li>Comments section for posts data</li>
        <li>Integration with a real API</li>
        <li>Dark Mode & Animations <span class="font-bold">[Settings Tab]</span></li>
    </ul>
    <br>
    <p>Note that since this is a fake API, any changes made will be lost if the page is refreshed. If you want to persist changes, you will need to integrate the app with a real API or a database.</p>
</template>

<script lang="ts">
export default {
    name: "HomeComponent"
}
</script>

<style scoped>

</style>