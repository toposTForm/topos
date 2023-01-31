
export default {
    state:{
        cellList: 'active',
        cellListsLog: new Map(),
        cellListRawLog: [],
    },
    actions: {
        loadCellListParams(ctx, params){
            ctx.commit("updateCellListParams", params);
        }
    },
    mutations:{
        updateCellListParams(state, params){
            state.cellListRawLog.push(params);
            if (state.cellListsLog.has(params.props.cellListuid)){
                state.cellListsLog.set(params.props.cellListuid, params);
            }else{
                state.cellListsLog.set(params.props.cellListuid, params);
            }
        }
    },
    getters:{
        getCellList(state){
            return state.cellListsLog;
        },
    },
}