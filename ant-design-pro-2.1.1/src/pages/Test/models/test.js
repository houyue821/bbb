import { queryTest ,removeTest,addTest} from '@/services/api';

export default {
  namespace: 'test',

  state: {
    data: [],
    form:{
      name: 'houyue',
      age: '24',
      address: '辽宁省葫芦岛市',
      sex:'女',
      public:'NICE',
      date: '2019-08-15',
      // amount: '500',
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTest, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeTest, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *addData({ payload, callback }, { call, put }) {
      const response = yield call(addTest, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateTest, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
        form: {
          ...state.form,
        },
      };
    },
  },
};
