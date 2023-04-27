<template>
    <div class="card">
        <DataTable :value="posts" tableStyle="min-width: 50rem">
            <pv-column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></pv-column>
            <pv-column style="width: 5rem">
                <template #body="slotProps">
                    <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editPost(slotProps.data)" />
                    <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="deletePost(slotProps.data.id)" />
                </template>
            </pv-column>
        </DataTable>
    </div>
</template>

<script setup>
import {ref, onMounted, onBeforeMount} from 'vue';
import {PostsApiService} from "@/services/posts-api-services";

let postsService = new PostsApiService();

onBeforeMount(() => {
    getPosts();
});

const getPosts = () => {
    postsService.getAll().then((response) => {
        console.log(response)
        console.log(response.data)
        posts.value = response.data
    });
};
const deletePost = (id) => {
    console.log(id)
    postsService.delete(id).then((response) => {
        console.log(response);
        if(response.status === 200){
            console.log("post deleted")
            this.getPosts();
        }
        else(
            console.log("error deleting post")
        )
    });
};

const posts = ref();
const columns = [
    { field: 'id', header: 'id' },
    { field: 'title', header: 'title' },
    { field: 'body', header: 'body' },
    { field: 'userId', header: 'userId' }
];
</script>

<script>
export default {
    name: "table-comp",
}
</script>

<style scoped>

</style>