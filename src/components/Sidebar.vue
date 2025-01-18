<template>
    <div class="sidebar">
        <div class="panel">
            <control-panel-item class="control-panel-item" id="customer" text="客户信息管理" jump-to-path="/index/customer" />
            <control-panel-item class="control-panel-item" id="department" text="员工信息管理"
                jump-to-path="/index/department" />
            <control-panel-item class="control-panel-item" id="employee" text="部门基本信息" jump-to-path="/index/employee" />            
            <control-panel-item class="control-panel-item" id="management" text="员工部门录属管理" jump-to-path="/index/management" />
        </div>

    </div>
</template>

<script setup lang='ts'>
import ControlPanelItem from '@/components/ControlPanelItem.vue'
</script>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 200px;
    height: 100vh;
    border-right: 1px solid #ebeef5;

    .panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 40px;
    }
}
</style>