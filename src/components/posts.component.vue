<template>
    <div>
        <div class="card">
            <pv-toolbar class="mb-4">
                <template #start>
                    <pv-toast/>
                    <pv-button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <pv-button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedPosts || !selectedPosts.length" />
                </template>

                <template #end>
                    <pv-file-upload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                    <pv-button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)"  />
                </template>
            </pv-toolbar>

            <DataTable ref="dt" :value="posts" v-model:selection="selectedPosts" dataKey="id"
                       :paginator="true" :rows="10" :filters="filters"
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Manage Posts</h4>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <pv-input-text v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                <pv-column selectionMode="multiple" style="width: 3rem" :exportable="false"></pv-column>
                <pv-column field="userId" header="User Id" sortable style="min-width:8rem;"></pv-column>
                <pv-column field="id" header="ID" sortable style="min-width:5rem"></pv-column>
                <pv-column field="title" header="Title" sortable style="min-width:10rem"></pv-column>
                <pv-column field="body" header="Body" sortable style="min-width:16rem"></pv-column>
                <pv-column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editPost(slotProps.data)" />
                        <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeletePost(slotProps.data)" />
                    </template>
                </pv-column>
            </DataTable>
        </div>

        <pv-dialog v-model:visible="postDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
            <div class="field">
                <label for="title">Title</label>
                <pv-input-text id="title" v-model.trim="post.title" required="true" autofocus :class="{'p-invalid': submitted && !post.title}" />
                <small class="p-error" v-if="submitted && !post.title">Title is required.</small>
            </div>
            <div class="field">
                <label for="body">Body</label>
                <pv-text-area id="body" v-model="post.body" required="true" rows="3" cols="20" />
            </div>

            <div class="field">
                <label for="userId" class="mb-3">User Id</label>
                <pv-dropdown id="userId" v-model="post.userId" :options="Array.from(userIds)" optionLabel="" placeholder="Select a User Id"/>
            </div>
            <template #footer>
                <pv-button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                <pv-button label="Save" icon="pi pi-check" text @click="savePost" />
            </template>
        </pv-dialog>

        <pv-dialog v-model:visible="deletePostDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="post">Are you sure you want to delete <b>{{post.title}}</b>?</span>
            </div>
            <template #footer>
                <pv-button label="No" icon="pi pi-times" text @click="deletePostDialog = false"/>
                <pv-button label="Yes" icon="pi pi-check" text @click="confirmedDeletePost" />
            </template>
        </pv-dialog>

        <pv-dialog v-model:visible="deletePostsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="post">Are you sure you want to delete the selected posts?</span>
            </div>
            <template #footer>
                <pv-button label="No" icon="pi pi-times" text @click="deletePostsDialog = false"/>
                <pv-button label="Yes" icon="pi pi-check" text @click="deleteSelectedPosts" />
            </template>
        </pv-dialog>
    </div>
</template>

<script lang="ts">
export default {
    name: "PostsComponent",
}
</script>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue';
import {FilterMatchMode} from 'primevue/api';
import {useToast} from 'primevue/usetoast';
import {PostsApiService} from "@/services/posts-api-services";

let postsService = new PostsApiService();

onBeforeMount(() => {
    getPosts();
    getUserIds();
});

export interface Post{
    id:number,
    title:string,
    body:string,
    userId:number,
}

const toast = useToast();
const dt = ref();
const posts = ref<Post[]>([]);
const postDialog = ref<boolean>(false);
const deletePostDialog = ref<boolean>(false);
const deletePostsDialog = ref<boolean>(false);
const post = ref<Post>({} as Post);
const selectedPosts = ref<Post[]>([]);
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref<boolean>(false);
const userIds = ref<Set<number>>(new Set());
const getPosts = () => {
    postsService.getAll().then((response) => {
        //console.log(response)
        posts.value = response.data
    });
};

const getUserIds = () => {
    postsService.getAll().then((response) => {
        //console.log(response)
        response.data.map(p => userIds.value.add(p.userId));
        console.log(Array.from(userIds.value))
    });
};

const createPost = (post:Post) => {
  postsService.createPost(post).then((response)=>{
      console.log(response)
      if (response.status === 201) {
          console.log("post created")
          // TODO: Remove comment from getPosts() when changing fake API URL to real API URL
          //getPosts();
      } else {
          console.log("post not created")
      }
  });
};

const updatePost = (id:number,post:Post) => {
    postsService.updatePost(id,post).then((response)=>{
        console.log(response)
        if (response.status === 200) {
            console.log("post updated")
            // TODO: Remove comment from getPosts() when changing fake API URL to real API URL
            //getPosts();
        } else {
            console.log("post not updated")
        }
    });
};

const deletePost = (id:number) => {
    postsService.delete(id).then((response) => {
        console.log(response);
        if(response.status === 200){
            console.log(`post ${id} deleted`);
            // TODO: Remove comment from getPosts() when changing fake API URL to real API URL
            //getPosts();
        }
        else(
            console.log("error deleting post")
        )
    });
};

const openNew = () => {
    post.value = {} as Post;
    submitted.value = false;
    postDialog.value = true;
};
const hideDialog = () => {
    postDialog.value = false;
    submitted.value = false;
};
const savePost = () => {
    submitted.value = true;

    if (post.value.title!.trim()) {
        if (post.value.id) {
            updatePost(post.value.id,post.value);

            // TODO: Remove the following piece of code when changing fake API URL to real API URL
            posts.value = posts.value.map(p => (p.id === post.value.id) ? {
                ...p,
                title: post.value.title,
                body: post.value.body,
                userId: post.value.userId
            } : p);


            toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            post.value.id = createId();
            createPost(post.value);

            // TODO: Remove the following line when changing fake API URL to real API URL
            posts.value.push(post.value);

            toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        postDialog.value = false;
        post.value = {} as Post;
    }
};

const editPost = (p:Post) => {
    post.value = {...p};
    postDialog.value = true;
};

const confirmDeletePost = (p:Post) => {
    post.value = p;
    deletePostDialog.value = true;
};

const confirmedDeletePost = () => {
    deletePost(post.value.id);

    // TODO: Remove the following line when changing fake API URL to real API URL
    posts.value = posts.value.filter(val => !(post.value===val));

    deletePostDialog.value = false;
    post.value = {} as Post;
    toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};

const createId = () => {
    return Math.max(...posts.value.map(p => p.id)) + 1;
}
const exportCSV = (data: any) => {
    console.log(data)
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deletePostsDialog.value = true;
};
const deleteSelectedPosts = () => {
    selectedPosts.value.forEach((p) => {
        deletePost(p.id);
    });

    // TODO: Remove the following line when changing fake API URL to real API URL
    posts.value = posts.value.filter(val => !selectedPosts.value.includes(val));

    deletePostsDialog.value = false;
    selectedPosts.value = [];
    toast.add({severity:'success', summary: 'Successful', detail: 'Posts Deleted', life: 3000});
};

</script>



<style scoped>

</style>