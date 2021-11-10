import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CalendarTasksState } from './state';
import { CalendarTask } from 'src/models/calendar';

const getters: GetterTree<CalendarTasksState, StateInterface> = {
  getDailyTasks(state: CalendarTasksState) {
    return (date: string) => state.tasks.filter((task: CalendarTask) => task.date === date);
  },
};

export default getters;
