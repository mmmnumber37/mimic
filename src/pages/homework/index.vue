<template>
  <q-page>
    <q-list>
      <template v-for="(hw, index) in hws" :key="index">
        <q-item exact clickable v-ripple>
          <q-item-section>
            {{ hw.title }}
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
              @click="removeHomework(hw.id)"
            />
          </q-item-section>
        </q-item>
        <q-separator />
      </template>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="accent" icon="add" to="/homework/add" />
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
        await store.dispatch('homework/getHomeworks');
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    });

    const hws = computed(() => cloneDeep(store.state.homework.homeworks));

    const removeHomework = async (id: number | undefined) => {
      try {
        await store.dispatch('homework/removeHomework', id);
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    };

    return {
      hws,
      removeHomework,
    };
  },
});
</script>

<style lang="scss" scoped></style>
