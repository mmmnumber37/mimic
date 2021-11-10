import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CalendarTasksState } from './state';
import { db } from 'boot/db';
import { CalendarTask } from 'src/models/calendar';

const actions: ActionTree<CalendarTasksState, StateInterface> = {
  async getTasks({ commit }) {
    // @TODO: реализовать частичную выборку для отображения
    const result = await db.getTasks();
    commit('SET_TASKS', result);
  },
  async addTask({ dispatch }, task: CalendarTask) {
    await db.addTask(task);
    await dispatch('getTasks');
  },
  async updateTask({ dispatch }, data: {id: number, task: CalendarTask}) {
    await db.updateTask(data);
    await dispatch('getTasks');
  },
  async emoveTask({ dispatch }, id: number) {
    await db.deleteTask(id);
    await dispatch('getTasks');
  },
};

export default actions;
