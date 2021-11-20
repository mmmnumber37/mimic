import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { HomeworksState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const homework: Module<HomeworksState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default homework;
