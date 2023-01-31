import {nextTick} from "vue";

export default {
    state:{
        counter: 0,
        cellsStatus: 'active',
        cellsLog: new Set(),
        cellsRawLog: [],
        clickUp: true,
        cellMinHeight: '55px',
        rowBarCount: 0,
        getListIdx: function (str, substr) {
            let str1 = str;
            let listIdx = [];
            let counter = 0;
            let lastIndex = -1;
            while ((lastIndex = str1.indexOf(substr, lastIndex + 1)) !== -1) {
                listIdx.push(lastIndex);
                counter++;

            }
            return {indexes: listIdx, amount: counter};
        },
    },
    actions: {
        loadResize(ctx, cellData){
            ctx.commit("resizeCell", {state: cellData});
        },
        loadCell(ctx, cellData){
            ctx.commit("updateCell", {state: cellData});
        },
        loadCellText(ctx, cellData){
            ctx.commit("processCellText", {state: cellData});
        },
        dbClickCell(ctx, cellData){
            ctx.commit("processDbClickCell", {state: cellData});
        },
        rClick(ctx, cellData){
            ctx.commit("showrClickMenu", {state: cellData});

        },
        loadCellRow(ctx, cellData){
            ctx.commit("updateCellRow", {state: cellData});
        },
        loadCellColumn(ctx, cellData){
            ctx.commit("updateCellColumn", {state: cellData});
        },
    },
    mutations:{
        resizeCell(state, cellData){
            if (cellData.state.clickDown){
                cellData.state.data.clickDown = true;
                state.clickUp = false;
            }
            if (cellData.state.mouseMoveColResize && !state.clickUp){
                cellData.state.data.mouseMoveColResize = true;
                if (cellData.state.data.mouseMoveColResize && cellData.state.data.clickDown && !state.clickUp){
                    let posX = cellData.state.el.offsetLeft;
                    let posY = cellData.state.el.offsetTop;
                    let width = cellData.state.el.offsetWidth;
                    let heigth = cellData.state.el.offsetHeight;
                    let cursorX = cellData.state.event.clientX;
                    let cursorY = cellData.state.event.clientY;
                    let bla = 0;
                    cellData.state.data.resizedWidth = (cursorX - posX);
                    cellData.state.data.cursor = 'col-resize';
                    bla = 0;
                }
            }
            if (cellData.state.clickUp){
                cellData.state.data.clickDown = false;
                cellData.state.data.clickUp = true;
                state.clickUp = true;
                cellData.state.data.mouseMoveColResize = false;
                cellData.state.data.cursor = 'pointer';
            }
            state.cellsRawLog.push(cellData.state);
            state.cellsLog.add(cellData.state);
        },
        updateCell(state, cellData){
            let parentCellList = this._modules.root.state.CellListModule;
            state.cellsLog.add(cellData.state);
            state.cellsRawLog.push(cellData.state);
        },
        processCellText(state, cellData){
            let bla = cellData.state.$data.cellText;
            bla = bla.replace(/[\n]/gi, '<br>');
            cellData.state.$data.cellTextHtml = bla;
            let oldHeight = cellData.state.$data.textAreaOldHeight;
            let newHeight = cellData.state.$data.textAreaNewHeight;
            let amount = state.getListIdx(bla, '<br>').amount;
            if (typeof bla !== 'undefined' && amount >= 1){
                let addHeight = amount * cellData.state.$data.fontSize;
                if ((oldHeight + addHeight) !== newHeight){
                    cellData.state.$data.textAreaNewHeight = cellData.state.$data.textAreaOldHeight + addHeight;
                }
            }
        },
        processDbClickCell(state, cellData){
            if (cellData.state.dbClicked){
                cellData.state.dbClicked = false;
                cellData.state.disableClick = true;
                nextTick(() => {
                    cellData.state.textAreaNewHeight = cellData.state.$el.offsetHeight;
                    cellData.state.cellBgColor = '';
                    cellData.state.cellFocusAnima = false;
                    setTimeout(() => {
                        cellData.state.disableClick = false;
                    }, 100);
                });
            }else{
                cellData.state.dbClicked = true;
                cellData.state.cellWIdth = 100 + '%';
            }
            state.cellsLog.add(cellData.state);
            state.cellsRawLog.push(cellData.state);
        },
        updateCellRow(state, cellData) {
            if (cellData.state.gridRow) return;
            if (this._modules.root.state.CellListModule.cellListsLog.has(cellData.state.parentCellList)){
                let parentCellList = this._modules.root.state.CellListModule.cellListsLog.get(cellData.state.parentCellList);
                if (typeof parentCellList.cellField.rows === 'undefined' || parentCellList.cellField.cols === ''){
                    let cols = parentCellList.cellField.defaultCols;
                    let cellNum = '';
                    if (state.cellsLog.has(cellData.state)){
                        let index = 1;
                        state.cellsLog.forEach((elem) => {
                            if (elem.uid === cellData.state.uid){
                                cellNum = index;
                            }
                            index++;
                        });
                    }
                    if (cellData.state.name === 'Cell') cellNum = cellNum - 2;
                    if (cellNum <= cols){
                        cellData.state.gridRow = 1;
                    }else{
                        if (!(cellNum % cols)){
                            cellData.state.gridRow = cellNum / cols;
                        }else{
                            cellData.state.gridRow = Math.floor(cellNum / cols + 1);
                        }
                    }
                    if (cellData.state.name === 'RowBar'){
                        if (cellData.state.gridRaw === 'undefined'){
                            cellData.state.gridRaw = 1;
                            state.rowBarCount = 1;
                        }else{
                            state.rowBarCount++;
                            cellData.state.gridRaw = state.rowBarCount;
                        }
                    }
                }else{
                    let cols = parentCellList.cellField.cols;
                    let cellNum = '';
                    if (state.cellsLog.has(cellData.state)){
                        let index = 1;
                        state.cellsLog.forEach((elem) => {
                            if (elem.uid === cellData.state.uid){
                                cellNum = index;
                            }
                            index++;
                        });
                    }
                    if (cellNum <= cols){
                        cellData.state.gridRow = 1;
                    }else{
                        if (!(cellNum % cols)){
                            cellData.state.gridRow = cellNum / cols;
                        }else{
                            cellData.state.gridRow = Math.floor(cellNum / cols + 1);
                        }
                    }
                }
            }
        },
        updateCellColumn(state, cellData) {
            if (cellData.state.gridCol) return;
            if (this._modules.root.state.CellListModule.cellListsLog.has(cellData.state.parentCellList)){
                let parentCellList = this._modules.root.state.CellListModule.cellListsLog.get(cellData.state.parentCellList);
                if (typeof parentCellList.cellField.cols === 'undefined' || parentCellList.cellField.cols === ''){
                    let cols = parentCellList.cellField.defaultCols;
                    if (cellData.state.name === 'RowBar') cols = 1;
                    let cellNum = '';
                    if (state.cellsLog.has(cellData.state)){
                        let index = 1;
                        state.cellsLog.forEach((elem) => {
                            if (elem.uid === cellData.state.uid){
                                cellNum = index;
                            }
                            index++;
                        });
                    }
                    if (cellNum <= cols){
                        if (cellData.state.name === 'RowBar') cellNum = cols;
                        cellData.state.gridCol = cellNum;
                    }else{
                        let res = Math.floor(cellNum % cols);
                        if (res === 0){
                            cellData.state.gridCol = cols;
                        } else{
                            cellData.state.gridCol = res;
                        }
                    }
                }else{
                    let cols = parentCellList.cellField.cols;
                    if (cellData.state.name === 'RowBar') cols = 1;
                    let cellNum = '';
                    if (state.cellsLog.has(cellData.state)){
                        let index = 1;
                        state.cellsLog.forEach((elem) => {
                            if (elem.uid === cellData.state.uid){
                                cellNum = index;
                            }
                            index++;
                        });
                    }
                    if (cellNum <= cols){
                        if (cellData.state.name === 'RowBar') cellNum = cols;
                        cellData.state.gridCol = cellNum;
                    }else{
                        let res = Math.floor(cellNum % cols);
                        if (res === 0){
                            cellData.state.gridCol = cols;
                        } else{
                            cellData.state.gridCol = res;
                        }
                    }
                }
            }
        },
        showrClickMenu(state, cellData){
            let bla = 0;
        }
    },
    getters:{
        getCell(state, index){
            return state.cellsLog[index];
        },
        getCellMinHeight(state){
            return state.cellMinHeight;
        },
        getClickUp(state){
            return state.clickUp;
        }
    },
}