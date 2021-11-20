import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { WatcherEventsState } from './state';
import { db } from 'boot/db';
import { Watcher, WatcherEvent } from 'src/models/watcher';

const actions: ActionTree<WatcherEventsState, StateInterface> = {
  async getWatchers({ commit }) {
    // @TODO: реализовать частичную выборку для отображения
    const result = await db.getWatchers();
    commit('SET_WATCHERS', result);
  },
  async addWatcher({ dispatch }, watcher: Watcher) {
    await db.addWatcher(watcher);
    await dispatch('getWatchers');
  },
  async removeWatcher({ dispatch }, id: number) {
    await db.deleteWatcher(id);
    await dispatch('getWatchers');
  },

  //////

  async getWatcherEvents({ commit }) {
    // @TODO: реализовать частичную выборку для отображения
    const result = await db.getWatcherEvents();
    commit('SET_WATCHER_EVENTS', result);
  },
  async addWatcherEvent({ dispatch }, watcherEvent: WatcherEvent) {
    await db.addWatcherEvent(watcherEvent);
    await dispatch('getWatcherEvents');
  },
  async updateWatcherEvent(
    { dispatch },
    data: { id: number; watcherEvent: WatcherEvent }
  ) {
    await db.updateWatcherEvent(data);
    await dispatch('getWatcherEvents');
  },
  async removeWatcherEvent({ dispatch }, id: number) {
    await db.deleteWatcherEvent(id);
    await dispatch('getWatcherEvents');
  },
};

export default actions;
