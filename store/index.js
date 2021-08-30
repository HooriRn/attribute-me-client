export const state = () => ({
    handTableSetting: null,
    cool: true,
    sideMenuDateLabel: null
})

export const mutations = {
    handTableSetting(state, payload) {
        state.handTableSetting = payload
    },
    sideMenuDateLabel(state, payload){
        state.sideMenuDateLabel = payload
    },
    cool(state, payload){
        state.cool = payload
    }
}

export const getters = {
    handTableSetting(state){
        return state.handTableSetting
    },
    sideMenuDateLabel(state){
        return state.sideMenuDateLabel
    },
    cool(state){
        return state.cool
    }
}