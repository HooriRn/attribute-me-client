export const state = () => ({
    handTableSetting: null,
    cool: true
})

export const mutations = {
    handTableSetting(state, payload) {
        state.handTableSetting = payload
    },
    cool(state, payload){
        state.cool = payload
    }
}

export const getters = {
    handTableSetting(state){
        return state.handTableSetting
    },
    cool(state){
        return state.cool
    }
}