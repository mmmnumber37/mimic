<template>
  <q-page padding>
    <div class="row">
      <q-input
        ref="name"
        v-model="nameModel"
        autofocus
        label="name"
        class="q-mb-md col-12"
      />
      <q-btn class="btn col-auto" label="save" @click="createHomework" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const nameModel = ref(null);

    const createHomework = async () => {
      try {
        if (!nameModel.value) throw new Error('Пустое поле');

        await store.dispatch('homework/addHomework', {
          title: nameModel.value,
        });

        await router.push('/homework');
      } catch (e) {
        $q.notify({
          message: (e as Error).message,
          color: 'purple',
        });
      }
    };

    return {
      nameModel,
      createHomework,
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
