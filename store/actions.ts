import { ActionTree } from 'vuex'
import TYPES from './types'

const actions: ActionTree<any, any> = {

  initToken({commit}, token: string) {
    commit(TYPES.SET_TOKEN, token)
  }
}
export default actions