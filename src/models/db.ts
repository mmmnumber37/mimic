import Dexie from 'dexie';
import { CalendarTask } from './calendar';

export class DB extends Dexie {
  tasks: Dexie.Table<CalendarTask, number>;

  constructor() {
    super('DB');

    this.version(1).stores({
      tasks: '++id',
    });

    this.tasks = this.table('tasks');
  }

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
}
