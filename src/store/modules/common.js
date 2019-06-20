import { commonConst } from '../constants';

export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    clearError (state) {
      state.error = null;
    },
  },
  actions: {
    setLoading ({ commit }, payload) {
      commit(commonConst.setLoading, payload)
    },
    setError ({ commit }, payload) {
      commit(commonConst.setError, payload)
    },
    clearError ({ commit }) {
      commit(commonConst.clearError)
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
