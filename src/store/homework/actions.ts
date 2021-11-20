import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { HomeworksState } from './state';
import { db } from 'boot/db';
import { Homework } from 'src/models/homework';

const actions: ActionTree<HomeworksState, StateInterface> = {
  async getHomeworks({ commit }) {
    // @TODO: реализовать частичную выборку для отображения
    const result = await db.getHomeworks();
    commit('SET_HOMEWORKS', result);
  },
  async addHomework({ dispatch }, homework: Homework) {
    await db.addHomework(homework);
    await dispatch('getHomeworks');
  },
  async removeHomework({ dispatch }, id: number) {
    await db.deleteHomework(id);
    await dispatch('getHomeworks');
  },
};

export default actions;
