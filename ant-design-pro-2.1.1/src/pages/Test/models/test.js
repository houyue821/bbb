import { queryTest } from '@/services/api';

export default {
  namespace: 'test',

  state: {
    data: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTest, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
