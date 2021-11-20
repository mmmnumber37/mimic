import { WatcherEvent, Watcher } from 'src/models/watcher';

export interface WatcherEventsState {
  events: WatcherEvent[];
  watchers: Watcher[];
}

function state(): WatcherEventsState {
  return {
    events: [],
    watchers: [],
  };
}

export default state;
