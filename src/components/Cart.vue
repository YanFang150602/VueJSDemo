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
            this.$store.commit('reduceFromCart', index);
        },
        add(index) {
            this.$store.commit('addFromCart', index);
        }
    }
}
</script>