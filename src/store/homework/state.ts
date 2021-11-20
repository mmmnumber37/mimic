import { Homework } from 'src/models/homework';

export interface HomeworksState {
  homeworks: Homework[];
}

function state(): HomeworksState {
  return {
    homeworks: [],
  };
}

export default state;
