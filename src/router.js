import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import Cart from './views/Cart';

Vue.use(VueRouter);

let router = new VueRouter({
    routes:[
        {
            path: '/',
            component: Home,
            name: 'home'
        },{
            path: '/cart',
            component: Cart,
            name: 'cart'
        }
    ]
})

export default router;