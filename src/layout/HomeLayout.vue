<script lang="ts" setup>
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: auto;">
        <router-view name="header"></router-view>
      </el-header>
      <el-container>
        <el-aside width="auto">
            <router-view name="sidebar"></router-view>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-container {
    height: 100vh;

    .el-main {
        --el-main-padding: 0 !important;
    }

    .el-header {
        border-bottom: 1px solid #ebeef5;
    }

    .el-footer {
        border-top: 1px solid #ebeef5;
    }
}
</style>
