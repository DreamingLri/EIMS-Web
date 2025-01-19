<template>
    <div class="main">
        <el-select v-model="type" placeholder="Select" style="width: 240px">
            <el-option label="员工姓名" :value=0 />
            <el-option label="入职日期" :value=1 />
            <el-option label="所属部门" :value=2 />
        </el-select>
        <el-input v-model="input" style="width: 240px" placeholder="搜索" />
        <el-button type="primary" @click="search">搜索</el-button>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
            <el-table-column prop="emp_no" label="工号" width="100" />
            <el-table-column prop="first_name" label="名" width="100" />
            <el-table-column prop="last_name" label="姓" width="100" />
            <el-table-column prop="gender" label="性别" width="100" />
            <el-table-column prop="hire_date" label="入职日期" width="120" :formatter="formatDate" />
            <el-table-column prop="birthday" label="出生日期" width="100" :formatter="formatDate" />
            <el-table-column prop="address" label="地址" width="100" />
            <el-table-column prop="telephone" label="联系电话" width="100" />
            <el-table-column prop="dept_name" label="所在部门" width="100" >
                <template #default="scope">
                    <el-tag v-for="(dept, index) in scope.row.dept_name" :key="index">{{ dept }}</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang='ts'>
import { searchApi } from '@/api/search.api';
import type { EmployeeSearch } from '@/model/search.model';
import { formatDate, formatStatus } from '@/utils/formatter';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const type = ref(0)
const input = ref('')
const tableData = ref<EmployeeSearch[]>()

async function search() {
    console.log(type.value, input.value)
    const res = await searchApi({type: type.value, content: input.value})
    if (res){
        console.log(res);
        
        tableData.value = res.list
        ElMessage.success('搜索成功')
    } else {
        ElMessage.error('搜索失败')
    }
}
</script>

<style scoped></style>