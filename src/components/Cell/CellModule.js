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
        selectedText: '',
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
        selectedText(ctx, cellData){
            ctx.commit("updateSelectedText", {state: cellData});
        }
    },
    mutations: {
        resizeCell(state, cellData) {
            if (cellData.state.clickDown) {
                cellData.state.data.clickDown = true;
                state.clickUp = false;
            }
            if (cellData.state.mouseMoveColResize && !state.clickUp) {
                cellData.state.data.mouseMoveColResize = true;
                if (cellData.state.data.mouseMoveColResize && cellData.state.data.clickDown && !state.clickUp) {
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
            if (cellData.state.clickUp) {
                cellData.state.data.clickDown = false;
                cellData.state.data.clickUp = true;
                state.clickUp = true;
                cellData.state.data.mouseMoveColResize = false;
                cellData.state.data.cursor = 'pointer';
            }
            state.cellsRawLog.push(cellData.state);
            state.cellsLog.add(cellData.state);
        },
        updateCell(state, cellData) {
            let parentCellList = this._modules.root.state.CellListModule;
            state.cellsLog.add(cellData.state);
            state.cellsRawLog.push(cellData.state);
        },
        processCellText(state, cellData) {
            // let bla = cellData.state.$data.cellText;
            let bla = cellData.state.$el.innerText;
            cellData.state.cellTextEl = cellData.state.$el;
            cellData.state.$data.cellText = bla;
            bla = bla.replace(/[\n]/gi, '<br>');
            cellData.state.$data.cellTextHtml = bla;
            let elem = cellData.state.$el.querySelector('.text-area');
            if (!elem.childNodes.length == 0){
                let range = document.createRange();
                let sel = window.getSelection();
                let offset = elem.childNodes[0].length;
                if (typeof offset === 'undefined') debugger
                // range.setStart(elem.childNodes[0], offset)
                // range.collapse(true);
                // sel.removeAllRanges();
                // sel.addRange(range);
            }
            // elem.innerHTML = `<span style=\"color: red; background-color: yellow \">${bla}</span>`;
            let oldHeight = cellData.state.$data.textAreaOldHeight;
            let newHeight = cellData.state.$data.textAreaNewHeight;
            let amount = state.getListIdx(bla, '<br>').amount;
            if (typeof bla !== 'undefined' && amount >= 1) {
                let addHeight = amount * cellData.state.$data.fontSize;
                if ((oldHeight + addHeight) !== newHeight) {
                    cellData.state.$data.textAreaNewHeight = cellData.state.$data.textAreaOldHeight + addHeight;
                }
            }
        },
        processDbClickCell(state, cellData) {
            if (cellData.state.dbClicked) {
                cellData.state.dbClicked = false;
                if (typeof cellData.state.$refs.quillEditor !== 'undefined'){
                    cellData.state.$data.cellTextHtml = cellData.state.$refs.quillEditor.$data.content;
                    cellData.state.$refs.quillEditor.$data.readOnly = true;
                    cellData.state.$refs.quillEditor.disableEditor();
                }
                if (cellData.state.$data.insertObj === 'quillEditor' || cellData.state.$data.insertObj === 'handsonTable'){
                    cellData.state.$.parent.refs.naiveModal.$refs.message.createMessage(
                        `Элемент ${cellData.state.$data.gridCol}Y/${cellData.state.$data.gridRow}X в режиме выбора`);
                }else{
                    cellData.state.$.parent.refs.naiveModal.$refs.message.createMessage(
                        `Выбор элемента ${cellData.state.$data.gridCol}Y/${cellData.state.$data.gridRow}X разблокирован`);
                }
                cellData.state.disableClick = true;
                cellData.state.$.parent.data.cellDbClicked = '';
                state.selectedText = '';
                nextTick(() => {
                    // cellData.state.textAreaNewHeight = cellData.state.$el.offsetHeight;
                    cellData.state.cellBgColor = '';
                    cellData.state.cellFocusAnima = false;
                    setTimeout(() => {
                        cellData.state.disableClick = false;
                    }, 100);
                });
            }else {
                if (cellData.state.$data.insertObj === ''){
                    return
                }else if (cellData.state.$data.insertObj === 'quillEditor' || cellData.state.$data.insertObj === 'handsonTable'){
                    cellData.state.$refs.quillEditor.enableEditor();
                    cellData.state.$.parent.refs.naiveModal.$refs.message.createMessage(
                        `Элемент ${cellData.state.$data.gridCol}Y/${cellData.state.$data.gridRow}X в режиме редактирования`);
                }else{
                    cellData.state.$.parent.refs.naiveModal.$refs.message.createMessage(
                        `Выбор элемента ${cellData.state.$data.gridCol}Y/${cellData.state.$data.gridRow}X заблокирован`);
                }
                cellData.state.dbClicked = true;
                if (typeof cellData.state.$refs.quillEditor !== 'undefined'){
                    cellData.state.$data.cellTextHtml = cellData.state.$refs.quillEditor.$data.content;
                }
                // cellData.state.$data.cellWIdth = 100 + '%';
                // if(cellData.state.$.parent.data.cellDbClicked === ''){
                //     cellData.state.$.parent.data.cellDbClicked = cellData;
                // }else{
                //     cellData.state.$.parent.data.cellDbClicked.state.$data.dbClicked = false;
                //     cellData.state.$.parent.data.cellDbClicked = cellData;
                // }
                nextTick(() => {
                    // cellData.state.$el.querySelector('.text-area').innerHTML = cellData.state.$data.cellText;
                    // cellData.state.$el.querySelector('.text-area').focus();
                    if (typeof cellData.state.$refs.quillEditor !== 'undefined'){
                        cellData.state.$data.cellTextHtml = cellData.state.$refs.quillEditor.$data.content;
                        // cellData.state.$refs.quillEditor.$data.content = cellData.state.cellTextHtml;
                        // cellData.state.textAreaNewHeight = cellData.state.$el.offsetHeight;
                        // cellData.state.$el.querySelector('.input-cell').children[0].children[0].children[0].focus();
                    }
                });
            }
            state.cellsLog.add(cellData.state);
            state.cellsRawLog.push(cellData.state);
        },
        updateCellRow(state, cellData) {
            if (cellData.state.gridRow) return;
            if (this._modules.root.state.CellListModule.cellListsLog.has(cellData.state.parentCellList)) {
                let parentCellList = this._modules.root.state.CellListModule.cellListsLog.get(cellData.state.parentCellList);
                if (typeof parentCellList.cellField.rows === 'undefined' || parentCellList.cellField.cols === '') {
                    let cols = parentCellList.cellField.defaultCols;
                    let cellNum = '';
                    if (state.cellsLog.has(cellData.state)) {
                        let index = 1;
                        state.cellsLog.forEach((elem) => {
                            if (elem.uid === cellData.state.uid) {
                                cellNum = index;
                            }
                            index++;
                        });
                    }
                    if (cellData.state.name === 'Cell') cellNum = cellNum;
                    if (cellNum <= cols) {
                        cellData.state.gridRow = 1;
                    } else {
                        if (!(cellNum % cols)) {
                            cellData.state.gridRow = cellNum / cols - 1;
                        } else {
                            cellData.state.gridRow = Math.floor(cellNum / cols);
                        }
                    }
                    if (cellData.state.name === 'RowBar') {
                        if (cellData.state.gridRaw === 'undefined') {
                            cellData.state.gridRaw = 1;
                            state.rowBarCount = 1;
                        } else {
                            state.rowBarCount++;
                            cellData.state.gridRaw = state.rowBarCount;
                        }
                    }
                } else {
                    let cols = parentCellList.cellField.cols;
                    let cellNum = '';
                    if (state.cellsLog.has(cellData.state)) {
                        let index = 1;
                        state.cellsLog.forEach((elem) => {
                            if (elem.uid === cellData.state.uid) {
                                cellNum = index;
                            }
                            index++;
                        });
                    }
                    if (cellNum <= cols) {
                        cellData.state.gridRow = 1;
                    } else {
                        if (!(cellNum % cols)) {
                            cellData.state.gridRow = cellNum / cols;
                        } else {
                            cellData.state.gridRow = Math.floor(cellNum / cols + 1);
                        }
                    }
                }
            }
        },
        updateCellColumn(state, cellData) {
            if (cellData.state.gridCol) return;
            if (this._modules.root.state.CellListModule.cellListsLog.has(cellData.state.parentCellList)) {
                let parentCellList = this._modules.root.state.CellListModule.cellListsLog.get(cellData.state.parentCellList);
                if (typeof parentCellList.cellField.cols === 'undefined' || parentCellList.cellField.cols === '') {
                    let cols = parentCellList.cellField.defaultCols;
                    if (cellData.state.name === 'RowBar') cols = 1;
                    let cellNum = '';
                    if (state.cellsLog.has(cellData.state)) {
                        let index = 1;
                        state.cellsLog.forEach((elem) => {
                            if (elem.uid === cellData.state.uid) {
                                cellNum = index;
                            }
                            index++;
                        });
                    }
                    if (cellNum <= cols) {
                        if (cellData.state.name === 'RowBar') cellNum = cols;
                        cellData.state.gridCol = cellNum;
                    } else {
                        let res = Math.floor(cellNum % cols);
                        if (res === 0) {
                            cellData.state.gridCol = cols;
                        } else {
                            cellData.state.gridCol = res;
                        }
                    }
                } else {
                    let cols = parentCellList.cellField.cols;
                    if (cellData.state.name === 'RowBar') cols = 1;
                    let cellNum = '';
                    if (state.cellsLog.has(cellData.state)) {
                        let index = 1;
                        state.cellsLog.forEach((elem) => {
                            if (elem.uid === cellData.state.uid) {
                                cellNum = index;
                            }
                            index++;
                        });
                    }
                    if (cellNum <= cols) {
                        if (cellData.state.name === 'RowBar') cellNum = cols;
                        cellData.state.gridCol = cellNum;
                    } else {
                        let res = Math.floor(cellNum % cols);
                        if (res === 0) {
                            cellData.state.gridCol = cols;
                        } else {
                            cellData.state.gridCol = res;
                        }
                    }
                }
            }
        },
        showrClickMenu(state, cellData) {
            let bla = 0;
        },
        updateSelectedText(state, cellData) {
            // let selected = cellData.state.event.target.value.substring(cellData.state.event.target.selectionStart, cellData.state.event.target.selectionEnd);
            // if (cellData.state.name !== 'clearSelectedState') {
            //     let selected = window.document.getSelection().toString();
            //     if (cellData.state.data.cellFocusAnima) {
            //         if (selected === '') {
            //             selected = cellData.state.el.innerText;
            //         }
            //         if (selected !== '') {
            //             state.selectedText = {
            //                 data: cellData.state.data,
            //                 el: cellData.state.el,
            //                 target: cellData.state.event.target,
            //                 text: selected
            //             };
            //         }
            //     } else if (cellData.state.data.dbClicked) {
            //         if (selected === '') {
            //             selected = cellData.state.el.innerText;
            //         }
            //         if (selected !== '') {
            //             state.selectedText = {
            //                 data: cellData.state.data,
            //                 el: cellData.state.el,
            //                 target: cellData.state.event.target,
            //                 text: selected
            //             };
            //         }
            //     } else if (!cellData.state.data.dbClicked && !cellData.state.data.cellFocusAnima) {
            //         state.selectedText = '';
            //     }
            // }else{
            //     state.selectedText = '';
            // }
            if (cellData.state.name === 'selectText'){
                let selected = window.document.getSelection().toString();
                // selected = `<span style=\"color: red; background-color: yellow \">${selected}</span>`;
                let elem = cellData.state.el.querySelector('.text-area');
                let range = document.createRange();
                if (selected !== ''){
                    selected = window.document.getSelection().getRangeAt(0);
                    if (window.document.getSelection().getRangeAt(0).startContainer.parentNode.nodeName === 'SPAN'){

                    }
                    let extract = selected.extractContents();
                    let spanWrapper = document.createElement('span');
                    spanWrapper.style.backgroundColor = 'red';
                    spanWrapper.appendChild(extract);
                    selected.insertNode(spanWrapper);
                    selected.collapse(true);
                    state.selectedText = {
                        data: cellData.state.data,
                        el: cellData.state.el,
                        target: cellData.state.event.target,
                        text: selected
                    };
                }else{
                    state.selectedText = '';
                }
            }else if (cellData.state.name === 'cellFocus'){
                let selected = '';
                if (typeof cellData.state.el.innerHTML !== 'undefined' && cellData.state.el.querySelector('div') != null){
                    try {
                        selected = cellData.state.el.querySelector('.cell-text').innerHTML;
                    }catch (e) {
                        console.log(e);
                    }

                }
                if (selected !== ''){
                    state.selectedText = {
                        data: cellData.state.data,
                        el: cellData.state.el,
                        target: cellData.state.event.target,
                        text: selected
                    };
                }else{
                    state.selectedText = '';
                }
            }
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
        },
        getSelectedText(state){
            return state.selectedText;
        }
    },
}