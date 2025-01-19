<template>
    <div class="main">
        <p>部门信息管理</p>
        <el-button @click="dialogAddVisible = true" type="primary" round style="width: 100px;">添加部门</el-button>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
            <el-table-column fixed prop="dept_no" label="部门编号" width="100" />
            <el-table-column prop="dept_name" label="部门名称" width="100" />
            <el-table-column prop="dept_peoplecount" label="部门人数" width="100" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogAddVisible" title="添加" width="800" style="border-radius: 20px;">
        <el-form :model="addForm" label-width="auto" style="max-width: 600px">
            <el-form-item label="部门名称" label-position="left">
                <el-input v-model="addForm.dept_name" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addDepartment">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog v-model="dialogEditVisible" title="编辑" width="800" style="border-radius: 20px;">
        <el-form :model="editFrom" label-width="auto" style="max-width: 600px">
            <el-form-item label="部门编号" label-position="left">
                <el-input v-model="editFrom.dept_no" disabled/>
            </el-form-item>
            <el-form-item label="部门名称" label-position="left">
                <el-input v-model="editFrom.dept_name" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateDepartment">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog v-model="dialogDeleteVisible" title="删除" width="400" style="border-radius: 20px;">
        <p>确定删除吗？</p>
        <el-button type="primary" @click="deleteDepartment">确定</el-button>
        <el-button @click="dialogDeleteVisible = false">取消</el-button>
    </el-dialog>
</template>

<script setup lang='ts'>
import { getDepartmentApi, addDepartmentApi, updateDepartmentApi, deleteDepartmentApi } from '@/api/department.api';
import type { Department, GetDepartmentRes } from '@/model/department.model';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const tableData = ref()
const dialogEditVisible = ref(false)
const dialogDeleteVisible = ref(false)
const dialogAddVisible = ref(false)

const addForm = ref<Department>({
    dept_no: 0,
    dept_name: '',
    dept_peoplecount: 0
})


const editFrom = ref<Department>({
    dept_no: 0,
    dept_name: '',
    dept_peoplecount: 0
})


function handleEdit(index: number, row: any) {
    console.log(index, row);
    dialogEditVisible.value = true
    editFrom.value = row
}

function handleDelete(index: number, row: any) {
    console.log(index, row);
    dialogDeleteVisible.value = true
    editFrom.value = row
}

async function getDepartment() {
    const res: GetDepartmentRes = await getDepartmentApi()
    if (res) {
        console.log(res);
        tableData.value = res.list
    } else {
        ElMessage.error('获取数据失败')
    }
}

async function addDepartment() {
    dialogAddVisible.value = false
    const res = await addDepartmentApi(addForm.value)
    if (res) {
        console.log(res);
        getDepartment()
        ElMessage.success('添加成功')
    } else {
        ElMessage.error('添加失败')
    }
}

async function updateDepartment() {
    const res = await updateDepartmentApi(editFrom.value)
    if (res) {
        console.log(res);
        dialogEditVisible.value = false
        getDepartment()
        ElMessage.success('更新成功')
    } else {
        ElMessage.error('更新失败')
    }
}

async function deleteDepartment() {
    console.log(editFrom.value);
    const res = await deleteDepartmentApi(editFrom.value.dept_no)
    if (res) {
        console.log(res);
        dialogDeleteVisible.value = false
        getDepartment()
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
}

onMounted(() => {
    getDepartment()
})
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    padding: 20px;
}
</style>