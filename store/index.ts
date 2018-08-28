import Vue from "vue";
import Vuex, { ActionTree, MutationTree } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex as any);

interface State {
  token: string;
  login: Boolean;
}

let state: State = {
  token: "token",
  login: false
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
