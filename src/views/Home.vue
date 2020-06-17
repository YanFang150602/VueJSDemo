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
            this.$store.commit('addCart', item);
        }
    }
}
</script>

<style scoped>

</style>
