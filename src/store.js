import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        cart: JSON.parse(localStorage.getItem('cart')) || []
    },
    mutations: {
        addCart(state, item) {
            let good = state.cart.find(v=>v.title === item.title);
            if(good) {
                good.count+=1;
            }
            else {
                state.cart.push({...item, count: 1});
            }
        },
        reduceFromCart(state, index) {
            let good = state.cart[index];
            if(good && good.count) {
                good.count -=1;
            }
        },
        addFromCart(state, index) {
            state.cart[index].count++;
        }
    },
    getters: {
        totalCount: state => {
            return state.cart.reduce((totalCount, v) => {
                return totalCount += v.count;
            },0);
        }
    }
});

store.subscribe((mutations, state) => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
})

export default store;