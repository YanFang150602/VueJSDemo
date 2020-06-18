# 安装
``` shell
npm install @vue/cli -g
vue create vue-mart
```

# vue基本语法
App.vue（父组件）
``` html
<template>
  <div id="app">
    <h1>{{title}}</h1>
    <ul>
      <li v-for="(good, index) in goods" :key="good">
        {{index+1}} : {{good.text}} | {{good.price}}
        <button @click="addCart(index)">添加购物车</button>
      </li>
    </ul>
    <Cart :data="cart" @add="onAdd" @reduce="onReduce"></Cart>
  </div>
</template>

<script>
import Cart from './components/Cart';

export default {
  name: 'App',
  // components 该组件需要用到的组件
  components: {
    Cart
  },
  // 该组件使用的数据，data是个函数，在返回的对象里定义数据
  data() {
    return {
      title: '开课吧！',
      goods: [
        {
          text: '百万年薪架构师',
          price: 100
        },
        {
          text: 'WEB全栈架构师',
          price: 80
        },
        {
          text: 'JS高级',
          price: 100
        }
      ],
      cart: [

      ]
    }
  },
  // 组件里使用的方法
  methods: {
    addCart(index) {
      console.log('添加到购物车里',':',index);
      let item = this.goods[index];
      let good = this.cart.find(v => item.text === v.text);
      if(good) {
        good.count += 1;
      }
      else {
        this.cart.push({...item, count:1});
      }
    },
    onReduce(args) {
      let {index} = args;
      if(this.cart[index].count) {
        this.cart[index].count--;
      }
    },
    onAdd(args) {
      let {index} = args;
      this.cart[index].count++;
    }
  } 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
Cart.vue（子组件）
``` html
<template>
    <table>
      <tr>
        <td>商品</td>
        <td>单价</td>
        <td>总价</td>
        <td>数量</td>
        <td>操作</td>
      </tr>
      <tr v-for="(c, index) in data" :key="c">
        <td>{{c.text}}</td>
        <td>{{c.price}}</td>
        <td>{{c.price * c.count}}</td>
        <td>{{c.count}}</td>
        <td>
            <button @click="reduce(index)">-</button>
            <button @click="add(index)">+</button>
        </td>
      </tr>
      <tr>
          <td colspan="5">总共{{total}}元</td>
          </tr>
    </table>
</template>

<script>
export default {
    // props 为组件定义属性，不建议组件直接修改自身的属性
    props: ['data'],
    // computed 依赖其他值，计算而来
    computed: {
        total() {
            return this.data.reduce((sum, v) => {
                return sum + v.price * v.count;
            },0)
        }
    },
    // 在组件里使用的方法
    methods: {
        reduce(index) {
            // $emit('给子组件定义的s事件名', 参数)，触发在父组件里定义的方法
            this.$emit('reduce', {index: index});
        },
        add(index) {
            this.$emit('add', {index: index});
        }
    }
}
</script>
```

# vue-router

安装个element-ui，便于界面开发

```shell
npm install  element-ui -S
```

安装个接口请求

```shell
npm install axios -S
```

## vue-router的基本使用

安装

```shell
npm install vue-router -S
```

新建个router.js文件

```js
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
```

在入口main.js里引入router

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

```

在App.vue文件里使用router-link、router-view

```vue
<template>
  <div id="app">
    <el-container>
      <el-header>
          <el-menu mode="horizontal">
              <el-menu-item index="1">
                  <img width="100px" src="https://img.kaikeba.com/logo-new@2x.png" alt="">
              </el-menu-item>
              <el-menu-item index="2">
                  <router-link to="/">首页</router-link>
              </el-menu-item>
              <el-menu-item index="3" style="float: right">
                  <router-link to="/cart">购物车</router-link>
                  <i class="el-icon-shopping-cart-1"></i>
              </el-menu-item>
          </el-menu>
      </el-header>
      <el-main>
          <!-- 切换页面的内容渲染 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
```

在vue-mart根目录下创建vue.config.js文件，模拟请求接口响应的数据

```js
module.exports = {
    // 扩展webpack
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/goods', function(req, res) {
                    res.json({
                        code: 0,
                        data: [
                            {
                                id: 1,
                                title: 'Vue实战 第一版',
                                price: '100',
                                img: '/img/01.JPG',
                                count: 100
                            },
                            {
                                id: 2,
                                title: 'Vue实战 第二版',
                                price: '100',
                                img: '/img/02.JPG',
                                count: 100
                            }
                        ]
                    })
                })
            }
        }
    }
}
```

## vue.config.js配置

https://cli.vuejs.org/zh/config/#全局-cli-配置

![image-20200617100359000](C:\Users\彦博\AppData\Roaming\Typora\typora-user-images\image-20200617100359000.png)

# vuex状态数据

安装

```shell
npm install vuex -S
```

新建个store.js文件

```js
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
    // 类似computed
    getters: {
        totalCount: state => {
            return state.cart.reduce((totalCount, v) => {
                return totalCount += v.count;
            },0);
        }
    }
});

// 监听mutations里注册的方法，当mutations里方法执行完毕后，触发subscribe，执行里面的函数
store.subscribe((mutations, state) => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
})

export default store;
```

在main.js里注册下store

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
```

views/Home.vue（展示货物）里使用this.$store触发mutations里注册的方法，将选中的货物添加到state.cart里

```vue
<template>
    <div>
        <el-row>
            <el-col :span="6" v-for="item in goods" :key="item">
                <el-card>
                    <img width="250px" height="180px" :src="item.img" class="image" alt="">
                    <div style="padding: 14px">
                        <span>{{item.title}}</span>
                        <el-button type="text" class="button">
                            <i class="el-icon-circle-plus" @click="addCart(item)"></i>
                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    components: {},
    data() {
        return {
            goods:[]
        }
    },
    async created() {
        let ret = await axios.get('/api/goods');
        this.goods = ret.data.data;
    },
    methods: {
        addCart(item) {
            // 触发mutations里注册的方法addCart，并给该方法传递参数（item）
            this.$store.commit('addCart', item);
        }
    }
}
</script>

<style scoped>

</style>
```

其他模块里也可以操控state.cart数据，components/Cart.vue（显示需要购买的货物数据）

```vue
<template>
    <table>
      <tr>
        <td>商品</td>
        <td>单价</td>
        <td>总价</td>
        <td>数量</td>
        <td>操作</td>
      </tr>
      <tr v-for="(c, index) in cart" :key="c">
        <td>{{c.title}}</td>
        <td>{{c.price}}</td>
        <td>{{c.price * c.count}}</td>
        <td>{{c.count}}</td>
        <td>
            <button @click="reduce(index)">-</button>
            <button @click="add(index)">+</button>
        </td>
      </tr>
      <tr>
          <td colspan="5">总共{{total}}元</td>
          </tr>
    </table>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        // 可以通过mapState里获取store.js里定义的state数据
        ...mapState({
            cart: state => state.cart
        }),
        total() {
            return this.cart.reduce((sum, v) => {
                return sum + v.price * v.count;
            },0)
        }
    },
    methods: {
        reduce(index) {
            // 将购物车state.cart里的货物数量减少1个
            this.$store.commit('reduceFromCart', index);
        },
        add(index) {
            // 添加货物到购物车state.cart里
            this.$store.commit('addFromCart', index);
        }
    }
}
</script>
```

store.js里的getters注册的属性，在App.vue里使用，显示选中货物的总量

```vue
<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu mode="horizontal">
          <el-menu-item index="1">
            <img width="100px" src="https://img.kaikeba.com/logo-new@2x.png" alt />
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/">首页</router-link>
          </el-menu-item>
          <el-menu-item index="3" style="float: right">
            <router-link to="/cart">购物车</router-link>
            <el-badge :value="totalCount">
              <i class="el-icon-shopping-cart-1"></i>
            </el-badge>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <!-- 切换页面的内容渲染 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { mapGetters } from "vuex";

Vue.use(ElementUI);

export default {
    name: "App",
    computed: {
        // 可以通过mapGetters获取store.js里定义的getters数据
        ...mapGetters({
            totalCount: "totalCount"
        })
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

```

# 1



# 2