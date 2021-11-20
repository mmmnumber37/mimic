<template>
  <q-page>
    <q-list>
      <template v-for="(watcher, index) in watchers" :key="index">
        <q-item :to="`/watcher/view/${watcher.id}`" exact clickable v-ripple>
          <q-item-section>
            {{ watcher.title }}
          </q-item-section>

          <!-- <q-item-section side>
            <q-btn
              flat
              round
              dense
              icon="edit"
              @click="removeWatcher(watcher.id)"
            />
          </q-item-section> -->

          <q-item-section side>
            <q-btn
              flat
              round
              dense
              icon="delete"
              @click="removeWatcher(watcher.id)"
            />
          </q-item-section>
        </q-item>
        <q-separator />
      </template>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="accent" icon="add" to="/watcher/add" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { cloneDeep } from 'lodash/index';
import { defineComponent, onMounted, computed } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const $q = useQuasar();

    onMounted(async () => {
      try {
        await store.dispatch('watcherEvent/getWatchers');
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    });

    const watchers = computed(() =>
      cloneDeep(store.state.watcherEvent.watchers)
    );

    const removeWatcher = async (id: number | undefined) => {
      try {
        await store.dispatch('watcherEvent/removeWatcher', id);
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    };

    return {
      watchers,
      removeWatcher,
    };
  },
});
</script>

<style lang="scss" scoped></style>
