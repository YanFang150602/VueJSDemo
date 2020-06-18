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
