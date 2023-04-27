<template>
    <pv-toolbar>
        <template #start>
            <pv-button label="Posts App" class="mr-2" />
        </template>

        <template #end>
            <pv-button icon="pi pi-search" class="mr-2" />
            <pv-button icon="pi pi-calendar" severity="success" class="mr-2" />
            <pv-button icon="pi pi-times" severity="danger" />
        </template>
    </pv-toolbar>
</template>

<script>
export default {
    name: "toolbar-comp"
}
</script>

<style scoped>

</style>