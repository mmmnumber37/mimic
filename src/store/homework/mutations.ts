import { MutationTree } from 'vuex';
import { HomeworksState } from './state';
import { Homework } from 'src/models/homework';

const mutation: MutationTree<HomeworksState> = {
  SET_HOMEWORKS(state: HomeworksState, data: Homework[]) {
    state.homeworks = data;
  },
};

export default mutation;
