import { store } from "../src/main";

store.createGlobalState({ globalKey: "globalVal"})

export default store.getGlobalState();