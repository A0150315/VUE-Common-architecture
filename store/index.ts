import Vue from "vue";
import Vuex, { ActionTree, MutationTree } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex as any);

interface State {
  token: string;
  login: Boolean;
  loading: Boolean;
  toastInfo: {
    toastContext: string;
    autoClose: Boolean;
  };
  alertInfo: {
    title: string;
    main: string;
    btn: Array<{
      name: string;
      callback: Function;
      highLight?: Boolean;
    }>;
  };
}

let state: State = {
  token: "token",
  login: false,
  loading: false,
  toastInfo: {
    toastContext: "",
    autoClose: true
  },
  alertInfo: {
    title: "",
    main: "",
    btn: []
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
