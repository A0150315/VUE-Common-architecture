const state = {
    data: {}
}

const mutations = {
    mutationStep(state, object) {
        state.data = object
    }
}

const actions = {
    actionsStep({
        commit
    }, object) {
        commit('mutationStep', object)
    }
}
// GETTER...
// SETTER...


export default {
    state,
    mutations,
    actions
}