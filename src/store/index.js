import Vue from "vue";
import Vuex from "vuex";
import { getProducts, deleteProducts } from "../assets/api/request";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    loading: false,
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    DELETE_PRODUCT(state, payload) {
      payload.forEach(
        (idForDelete) =>
          (state.products = state.products.filter(
            (item) => item.id !== idForDelete
          ))
      );
    },
    SWITCH_LOADING(state) {
      state.loading = !state.loading;
    },
  },
  actions: {
    async fetchProducts({ commit, dispatch }) {
      commit("SWITCH_LOADING");
      await getProducts()
        .then((res) => {
          commit("SET_PRODUCTS", res);
          commit("SWITCH_LOADING");
        })
        .catch((err) => {
          console.log(err);
          if (err.error === "Server error") {
            commit("SWITCH_LOADING");
            dispatch("fetchProducts");
          }
        });
    },
    async deleteProduct({ commit, dispatch }, ids) {
      commit("SWITCH_LOADING");
      await deleteProducts()
        .then((res) => {
          commit("DELETE_PRODUCT", ids);
          commit("SWITCH_LOADING");
        })
        .catch((err) => {
          console.log(err);
          if (err.error === "Server error") {
            commit("SWITCH_LOADING");
            dispatch("deleteProduct", ids);
          }
        });
    },
  },
  getters: {
    getProducts: ({ products }) => (sortBy, sortOrder) => {
      if (sortBy !== "product") {
        return products
          .slice()
          .sort((a, b) =>
            sortOrder === "asc"
              ? a[sortBy] - b[sortBy]
              : sortOrder === "desc"
              ? b[sortBy] - a[sortBy]
              : b[sortBy] - a[sortBy]
          );
      } else {
        return sortOrder === "asc"
          ? products
              .slice()
              .sort((a, b) =>
                a.product > b.product ? 1 : b.product > a.product ? -1 : 0
              )
          : sortOrder === "desc"
          ? products
              .slice()
              .sort((a, b) =>
                a.product > b.product ? 1 : b.product > a.product ? -1 : 0
              )
              .reverse()
          : products.slice.sort((a, b) =>
              a.product > b.product ? 1 : b.product > a.product ? -1 : 0
            );
      }
    },
    getProductsNames({ products }) {
      return products.map((item) => item.product);
    },
  },
  modules: {},
});
