import { store } from "../src/main";

store.createGlobalState({ globalKey: "some global value"})

export default store.getGlobalState();