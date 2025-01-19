<template>
    <div class="header">
        <div class="avatar-name">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="small"/>
            <span>{{userStore.Admin?.name}}</span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style scoped>
.header {
    height: 40px;
    align-items: center;
    justify-content: right;
    display: flex;



    .avatar-name {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            margin-left: 10px;
        }
    }
}
</style>