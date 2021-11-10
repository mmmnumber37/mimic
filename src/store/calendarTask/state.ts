import { CalendarTask } from 'src/models/calendar';

export interface CalendarTasksState {
  tasks: CalendarTask[];
}

function state(): CalendarTasksState {
  return {
    tasks: [],
  };
}

export default state;
