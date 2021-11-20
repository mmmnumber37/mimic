import Dexie from 'dexie';

import { CalendarTask } from 'src/models/calendar';
import { Watcher, WatcherEvent } from 'src/models/watcher';
import { Homework } from 'src/models/homework';

import dataPackage from '../../package.json';

export class DBMimic extends Dexie {
  tasks: Dexie.Table<CalendarTask, number>;
  watchers: Dexie.Table<Watcher, number>;
  watcherEvents: Dexie.Table<WatcherEvent, number>;
  homeworks: Dexie.Table<Homework, number>;

  constructor() {
    super('DBMimic');

    // @TODO: при изменении бд нужно менять версию
    // @TODO: реализовать отдельные модули для таблиц и миграций
    this.version(Number(dataPackage['db-version'])).stores({
      tasks: '++id',
      watchers: '++id',
      watcherEvents: '++id',
      homeworks: '++id',
    });

    this.tasks = this.table('tasks');
    this.watchers = this.table('watchers');
    this.watcherEvents = this.table('watcherEvents');
    this.homeworks = this.table('homeworks');
  }

  // Tasks

  async getTasks(): Promise<CalendarTask[]> {
    return await this.tasks.toArray();
  }

  async addTask(task: CalendarTask) {
    await this.tasks.add(task);
  }

  async updateTask({ id, task }: { id: number; task: CalendarTask }) {
    await this.tasks.update(id, task);
  }

  async deleteTask(id: number) {
    await this.tasks.delete(id);
  }

  // Watchers

  async getWatchers(): Promise<Watcher[]> {
    return await this.watchers.toArray();
  }

  async addWatcher(watcher: Watcher) {
    await this.watchers.add(watcher);
  }

  async updateWatcher({ id, watcher }: { id: number; watcher: Watcher }) {
    await this.watchers.update(id, watcher);
  }

  async deleteWatcher(id: number) {
    await this.watchers.delete(id);
  }

  // WatcherEvents

  async getWatcherEvents(): Promise<WatcherEvent[]> {
    return await this.watcherEvents.toArray();
  }

  async addWatcherEvent(watcherEvent: WatcherEvent) {
    await this.watcherEvents.add(watcherEvent);
  }

  async updateWatcherEvent({
    id,
    watcherEvent,
  }: {
    id: number;
    watcherEvent: WatcherEvent;
  }) {
    await this.watcherEvents.update(id, watcherEvent);
  }

  async deleteWatcherEvent(id: number) {
    await this.watcherEvents.delete(id);
  }

  // Homeworks

  async getHomeworks(): Promise<Homework[]> {
    return await this.homeworks.toArray();
  }

  async addHomework(homeworks: Homework) {
    await this.homeworks.add(homeworks);
  }

  async deleteHomework(id: number) {
    await this.homeworks.delete(id);
  }
}
