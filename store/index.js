export const state = () => ({
    tableSetting: null,
    cool: true,
    sideMenuDateLabel: null,
})

export const mutations = {
    tableSetting(state, payload) {
        state.tableSetting = payload
    },
    sideMenuDateLabel(state, payload){
        state.sideMenuDateLabel = payload
    },
    cool(state, payload){
        state.cool = payload
    }
}

export const getters = {
    tableSetting(state){
        return JSON.parse(JSON.stringify(state.tableSetting))
    },
    sideMenuDateLabel(state){
        return state.sideMenuDateLabel
    },
    cool(state){
        return state.cool
    },

}