import * as firebase from 'firebase';
import { userConst, commonConst } from '../constants';

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    [userConst.setUser] (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async [userConst.registerUser] ({ commit }, { email, password }) {
      commit(commonConst.clearError);
      commit(commonConst.setLoading, true);
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        commit(userConst.setUser, new User(user.user.uid));
        commit(commonConst.setLoading, false);
      } catch (e) {
        commit(commonConst.setError, e.message);
        commit(commonConst.setLoading, false);
        throw e
      }
    },

    async [userConst.loginUser] ({ commit }, { email, password }) {
      commit(commonConst.clearError);
      commit(commonConst.setLoading, true);
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        commit(userConst.setUser, new User(user.user.uid));
        commit(commonConst.setLoading, false);
      } catch (e) {
        commit(commonConst.setError, e.message);
        commit(commonConst.setLoading, false);
        throw e
      }
    },

    [userConst.autoLoginUser] ({ commit }, payload) {
      commit(userConst.setUser, new User(payload.uid))
    },

    async [userConst.logoutUser] ({ commit }) {
      try {
        await firebase.auth().signOut();
        commit(userConst.setUser, null);
      } catch (e) {
        commit(commonConst.setError, e.message);
        throw e
      }
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
