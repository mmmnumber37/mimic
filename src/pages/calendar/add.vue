<template>
  <q-page padding>
    <div class="row">
      <q-input
        ref="name"
        v-model="nameModel"
        label="name"
        class="q-mb-md col-12"
      />
      <q-btn class="btn col-auto" label="save" @click="createTask" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { date, useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
import { configSegmentsTime } from 'src/data/segmentsTime';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    //const name = ref(null);
    const nameModel = ref(null);

    // @TODO: надо пописать тип, возможно не работает на мобильке
    // onMounted(async () => {
    //   await nextTick();
    //
    //   //name.value.focus();
    // });

    const getSegment = (index: number): string => {
      return date.formatDate(
        date.addToDate(Date.now(), configSegmentsTime[index]),
        'YYYY/MM/DD'
      );
    };

    const createTask = async () => {
      try {
        if (!nameModel.value) throw new Error('Пустое поле');
        for (let i = 0; i < 5; i++) {
          await store.dispatch('calendarTask/addTask', {
            date: getSegment(i),
            time: '18:00', // может пригодится
            name: nameModel.value,
            check: false,
            count: i + 1,
          });
        }

        await router.push('/calendar');
      } catch (e) {
        $q.notify({
          message: (e as Error).message,
          color: 'purple',
        });
      }
    };

    return {
      // name,
      nameModel,
      createTask,
    };
  },
});
</script>

<style lang="scss">
.word-wrap {
  word-break: break-word;
}
</style>

<style lang="scss" scoped>
.btn {
  border: 1px solid #fff;
}
</style>
