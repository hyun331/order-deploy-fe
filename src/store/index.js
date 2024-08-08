import {createStore} from 'vuex';
import practice from './practice';
import cart from "./cart"

const store = createStore({
    modules:{
        practice, cart
    }
})

export default store;

// 이걸 해줘야 main.js에서 가져다 쓸 수 있음