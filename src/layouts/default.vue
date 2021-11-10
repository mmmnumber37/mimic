<template>
  <q-layout view="lHh LpR lFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Mimic </q-toolbar-title>

        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      elevated
    >
      <q-list>
        <q-item clickable v-ripple to="/">
          <q-item-section>
            <q-icon name="add_circle_outlinen" />
          </q-item-section>
          <q-item-section> main </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple to="/calendar">
          <q-item-section >
            <q-icon name="add_circle_outline" />
          </q-item-section>
          <q-item-section> calendar </q-item-section>
        </q-item>
      </q-list>
      <!-- <q-btn class="column" icon="add_circle_outline" to="/"> main </q-btn>
      <q-btn class="column" icon="add_circle_outline" to="/calendar">
        calendar
      </q-btn> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar id="layout-footer" />
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
