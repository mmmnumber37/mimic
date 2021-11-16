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
        />
      </div>
    </div>

    <div class="row">
      <q-list v-if="events.length" bordered separator class="col">
        <q-item
          v-for="(event, index) in events"
          :key="index"
          tag="label"
          v-ripple
        >
          <q-item-section side top>
            <q-checkbox
              v-model="event.check"
              @update:model-value="
                updateTask({ id: event.id, task: { check: $event } })
              "
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span v-if="event.count">({{ event.count }})</span>
              {{ event.name }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              flat
              round
              dense
              icon="delete"
              @click="removeTask(event.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="accent" icon="add" to="/calendar/add" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { date, useQuasar } from 'quasar';
import { cloneDeep } from 'lodash/index';
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useStore } from 'src/store';
import { CalendarTask } from 'src/models/calendar';

export default defineComponent({
  components: {},
  setup() {
    const dateLocal = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));
    const store = useStore();
    const $q = useQuasar();

    onMounted(async () => {
      try {
        await store.dispatch('calendarTask/getTasks');
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    });

    const dateEvents = computed(() =>
      store.state.calendarTask.tasks.map((task) => task.date)
    );

    const events = computed((): CalendarTask[] => {
      return cloneDeep(store.state.calendarTask.tasks).filter(
        (task: CalendarTask) => task.date === dateLocal.value
      );
    });

    const updateTask = async (data: { id: number; task: CalendarTask }) => {
      try {
        await store.dispatch('calendarTask/updateTask', data);
      } catch (error) {
        console.error(error as Error);
        $q.notify({
          message: (error as Error).message,
          color: 'red',
        });
      }
    };

    const removeTask = async (id: number | undefined) => {
      try {
        await store.dispatch('calendarTask/removeTask', id);
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
      events,
      updateTask,
      removeTask,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar {
  border-radius: 0;
}
</style>
