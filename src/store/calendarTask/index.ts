import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { CalendarTasksState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const calendarTask: Module<CalendarTasksState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default calendarTask;
