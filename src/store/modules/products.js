import * as firebase from 'firebase';
import { commonConst, productConst } from '../constants';

class Product {
  constructor(
    title,
    vendor,
    color,
    material,
    price,
    description,
    ownId,
    imgSrc = '',
    promo = false,
    id = null
  ) {
    this.title = title;
    this.vendor = vendor;
    this.color = color;
    this.material = material;
    this.price = price;
    this.description = description;
    this.ownId = ownId;
    this.imgSrc = imgSrc;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    products: []
  },
  mutations: {
    [productConst.createProduct] (state, payload) {
      state.products.push(payload)
    },
    [productConst.loadProducts] (state, payload) {
      state.products.push(...payload)
    },
    [productConst.editProduct] (state, { title, description, id }) {
      const product = state.products.find(product => product.id === id);
      product.title = title;
      product.description = description
    }
  },
  actions: {
    async [productConst.createProduct] ({ commit, getters }, payload) {
      commit(commonConst.clearError);
      commit(commonConst.setLoading, true);
      const image = payload.image;

      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.color,
          payload.material,
          payload.price,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        );

        const product = await firebase.database().ref('products').push(newProduct);
        const imageExt = image.name.slice(image.name.lastIndexOf('.'));
        const fileData = await firebase.storage().ref(`products/${product.key}${imageExt}`).put(image);
        const imgSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL();
        await firebase.database().ref('products').child(product.key).update({ imgSrc });
        commit(commonConst.setLoading, false);
        commit(productConst.createProduct, {
          ...newProduct,
          id: product.key,
          imgSrc: imgSrc
        })
      } catch (e) {
        commit(commonConst.setError, e.message);
        commit(commonConst.setLoading, false);
        throw e
      }
    },

    async [productConst.fetchProducts] ({ commit }) {
      commit(commonConst.clearError);
      commit(commonConst.setLoading, true);

      try {
        const resultProducts = [];
        const productsVal = await firebase.database().ref('products').once('value');
        const products = productsVal.val();

        Object.keys(products).forEach(key => {
          const product = products[key];
          resultProducts.push(
            new Product(
              product.title,
              product.vendor,
              product.color,
              product.material,
              product.price,
              product.description,
              product.ownId,
              product.imgSrc,
              product.promo,
              key
            )
          );
        });
        commit(productConst.loadProducts, resultProducts);
        commit(commonConst.setLoading, false);
      } catch (e) {
        commit(commonConst.setError, e.message);
        commit(commonConst.setLoading, false);
        throw e
      }
    },

    async [productConst.editProduct] ({ commit }, { title, description, id }) {
      commit(commonConst.clearError);
      commit(commonConst.setLoading, true);
      try {
        await firebase.database().ref('products').child(id).update({
          title,
          description
        });
        commit(productConst.editProduct, { title, description, id });
        commit(commonConst.setLoading, false);
      } catch (e) {
        commit(commonConst.setError, e.message);
        commit(commonConst.setLoading, false);
        throw e
      }
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    promoProducts (state) {
      return state.products.filter(product => product.promo)
    },
    myProducts (state, getters) {
      return state.products.filter(product => product.ownId === getters.user.id)
    },
    productById (state) {
      return productId => {
        return state.products.find(product => product.id === productId)
      }
    }
  }
}
