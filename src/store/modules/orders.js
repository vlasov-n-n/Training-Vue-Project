import * as firebase from 'firebase';

import { commonConst, orderConst } from '../constants';

class Order {
  constructor(name, email, productId, ownId, done = false, id = null) {
    this.name = name;
    this.email = email;
    this.productId = productId;
    this.ownId = ownId;
    this.done = done;
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    [orderConst.loadOrders] (state, payload) {
      state.orders = payload;
    }
  },
  actions: {
    async [orderConst.createOrder] ({ commit }, { name, email, productId, ownId  }) {
      const newOrder = new Order(name, email, productId, ownId);
      commit(commonConst.clearError);

      try {
        firebase.database().ref(`/users/${ownId}/orders`).push(newOrder);
      } catch (e) {
        commit(commonConst.setError, e);
        throw e;
      }
    },

    async [orderConst.fetchOrders] ({ commit, getters }) {
      commit(commonConst.setLoading, true);
      commit(commonConst.clearError);

      try {
        const fbVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value');
        const orders = fbVal.val();
        const result = [];

        Object.keys(orders).forEach(key => {
          const order = orders[key];
          result.push(new Order(
            order.name,
            order.email,
            order.productId,
            order.ownId,
            order.done,
            key,
          ));
        });

        commit(orderConst.loadOrders, result);
        commit(commonConst.setLoading, false);
      } catch (e) {
        commit(commonConst.setLoading, false);
        commit(commonConst.setError, e);
        throw e;
      }
    },

    async [orderConst.markOrder] ({ commit, getters }, payload) {
      commit(commonConst.clearError);
      commit(commonConst.setLoading, true);

      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        });
        commit(commonConst.setLoading, false);
      } catch (e) {
        commit(commonConst.setLoading, false);
        commit(commonConst.setError, e);
        throw e;
      }
    }
  },
  getters: {
    orders (state) {
      return state.orders
    },
  }
}
