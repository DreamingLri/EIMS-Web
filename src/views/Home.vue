<template>
  <div class="home">
    <el-card style="max-width: 400px" class="box-card">
      <div class="title">
        <span>欢迎使用 企业信息管理系统</span>
      </div>
      <div>
        <el-input v-model="name" style="height: 40px" placeholder="请输入用户名" clearable>
          <template #prefix>
            <svg-icon icon="user" color="#71B6FF" size="20px" />
          </template>
        </el-input>
      </div>
      <div>
        <el-input v-model="password" style="height: 40px" placeholder="请输入密码" clearable show-password>
          <template #prefix>
            <svg-icon icon="key" color="#71B6FF" size="20px" />
          </template>
        </el-input>
      </div>
      <div>
        <el-button type="primary" @click="login" shouldAddSpace>
          登 录
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const password = ref('');

const userStore = useUserStore();

const router = useRouter();

async function login() {
  console.log(name.value, password.value);
  const res = await userStore.login(name.value, password.value);
  if (res) {
    ElMessage.success('登录成功');
    router.push('/index')
  } else {
    ElMessage.error('登录失败');
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .box-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .title {
      span {
        font-size: 20px;
        font-weight: bold;
      }

    }

    .el-input {
      margin-top: 20px;
    }

    .el-button {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
