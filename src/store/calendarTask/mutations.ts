import { MutationTree } from 'vuex';
import { CalendarTasksState } from './state';
import { CalendarTask } from 'src/models/calendar';

const mutation: MutationTree<CalendarTasksState> = {
  SET_TASKS(state: CalendarTasksState, data: CalendarTask[]) {
    state.tasks = data;
  },
};

export default mutation;
