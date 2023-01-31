/* eslint-disable */
import {createStore} from "vuex";
import FormlistModule from "@/components/FormList/formlistModule";
import CellListModule from "@/components/CellList/CellListModule";
import CellModule from "@/components/Cell/CellModule";
import RightClickMenuModule from "@/components/RightClickMenu/RightClickMenuModule";



// Create a new store instance.
const store = createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules:{
        FormlistModule,
        CellListModule,
        CellModule,
        RightClickMenuModule
    }
})
export default store;