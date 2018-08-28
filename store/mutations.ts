import TYPES from './types';
import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
  [TYPES.SET_TOKEN](state, token): void{
    state.token = token
  }
}

export default mutations