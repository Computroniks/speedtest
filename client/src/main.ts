// SPDX-FileCopyrightText: 2021-2022 vuejs
// SPDX-License-Identifier: MIT

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
