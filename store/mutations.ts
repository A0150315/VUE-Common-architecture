import TYPES from "./types";
import { MutationTree } from "vuex";

const mutations: MutationTree<any> = {
  [TYPES.SET_TOKEN](state, token): void {
    state.token = token;
  },
  [TYPES.SET_ROUTER_STATE](state, loading): void {
    state.loading = loading;
  },
  [TYPES.SET_TOAST_CONTEXT](state, toastInfo): void {
    state.toastInfo = toastInfo;
  },
  [TYPES.SET_ALERT](state, alertInfo): void {
    state.alertInfo = alertInfo;
  }
};

export default mutations;
