import { ActionTree } from "vuex";
import TYPES from "./types";

const actions: ActionTree<any, any> = {
  initToken({ commit }, token: string) {
    commit(TYPES.SET_TOKEN, token);
  },
  changeRouterState({ commit }, loading: Boolean) {
    commit(TYPES.SET_ROUTER_STATE, loading);
  },
  // Toast
  autoToast({ commit }, toastContext: string) {
    commit(TYPES.SET_TOAST_CONTEXT, { toastContext, autoClose: true });
  },
  toast({ commit }, toastContext: string) {
    commit(TYPES.SET_TOAST_CONTEXT, { toastContext, autoClose: false });
  },
  closeToast({ commit }) {
    commit(TYPES.SET_TOAST_CONTEXT, { toastContext: "", autoClose: false });
  },
  // Alert
  alert({ commit }, alertInfo: Object) {
    commit(TYPES.SET_ALERT, alertInfo);
  },
  clearAlert({ commit }) {
    commit(TYPES.SET_ALERT, {
      title: "",
      main: "",
      btn: []
    });
  }
};
export default actions;
