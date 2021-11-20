import { MutationTree } from 'vuex';
import { WatcherEventsState } from './state';
import { Watcher, WatcherEvent } from 'src/models/watcher';

const mutation: MutationTree<WatcherEventsState> = {
  SET_WATCHERS(state: WatcherEventsState, data: Watcher[]) {
    state.watchers = data;
  },
  SET_WATCHER_EVENTS(state: WatcherEventsState, data: WatcherEvent[]) {
    state.events = data;
  },
};

export default mutation;
