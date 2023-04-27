import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import PrimeVue from "primevue/config";
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-dark-teal/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core
import "primeicons/primeicons.css"; //icons
import Toolbar from 'primevue/toolbar';
import Button from "primevue/button"
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const app = createApp(App)
app.component('pv-button', Button);
app.component('pv-toolbar', Toolbar);
app.component('pv-card', Card);
app.component('DataTable', DataTable);
app.component('pv-column', Column);

app.use(router)
app.use(PrimeVue, {ripple: true});

app.mount('#app')
