<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <q-date
          class="full-width calendar"
          v-model="dateLocal"
          :events="dateEvents"
          first-day-of-week="1"
          today-btn
          @update:model-value="checkEvent"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { date, useQuasar } from 'quasar';
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import { WatcherEvent } from 'src/models/watcher';

export default defineComponent({
  components: {},
  setup() {
    const dateLocal = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));
    const store = useStore();
    const route = useRoute();
    const $q = useQuasar();
    const watcherId = Number(route.params.id);

    onMounted(async () => {
      try {
        await store.dispatch('watcherEvent/getWatcherEvents');
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    });

    const events = computed(() =>
      store.state.watcherEvent.events.filter(
        (event) => event.watcherId === watcherId
      )
    );

    const dateEvents = computed(() => events.value.map((event) => event.date));

    const addEvent = async (watcherEvent: WatcherEvent) => {
      try {
        await store.dispatch('watcherEvent/addWatcherEvent', watcherEvent);
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    };

    const removeEvent = async (id: number | undefined) => {
      try {
        await store.dispatch('watcherEvent/removeWatcherEvent', id);
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    };

    const checkEvent = async <T>(
      value: T,
      reason: T,
      { year, month, day }: { year: string; month: string; day: string }
    ) => {
      try {
        const eventDate = `${year}/${month}/${day}`;
        const isEvent = events.value.find((event) => event.date === eventDate);

        if (isEvent) {
          await removeEvent(isEvent.id);
        } else {
          await addEvent({
            watcherId,
            date: eventDate,
          });
        }
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    };

    return {
      dateLocal,
      dateEvents,
      checkEvent,
    };
  },
});
</script>

<style lang="scss">
.q-date__event {
  height: 30px;
  width: 30px;
  opacity: 0.6;
  bottom: 0;
}
</style>
