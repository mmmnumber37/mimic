import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { WatcherEventsState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const watcherEvent: Module<WatcherEventsState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default watcherEvent;
