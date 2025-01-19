<template>
    <div class="main">
        <p>员工部门录属管理</p>
        <el-button @click="dialogAddVisible = true" type="primary" round style="width: 100px;">添加录属</el-button>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
            <el-table-column fixed prop="ed_id" label="编号" width="100" />
            <el-table-column prop="emp_no" label="工号" width="100" />
            <el-table-column prop="emp_name" label="姓名" width="100" />
            <el-table-column prop="dept_no" label="部门编号" width="100" />
            <el-table-column prop="dept_name" label="部门名称" width="100" />
            <el-table-column prop="entry_date" label="加入日期" width="120" :formatter="formatDate" />
            <el-table-column prop="leave_date" label="离开日期" width="100" :formatter="formatDate" />
            <el-table-column prop="status" label="当前状态" width="100" :formatter="formatStatus"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogAddVisible" title="添加" width="800" style="border-radius: 20px;">
        <el-form :model="addForm" label-width="auto" style="max-width: 600px">
            <el-form-item label="员工" label-position="left">
                <el-select v-model="addForm.emp_no" placeholder="Select" style="width: 240px">
                    <el-option v-for="item in employeeOptions" :key="item.emp_no" :label="item.last_name + ' ' + item.first_name" :value="item.emp_no" />
                </el-select>
            </el-form-item>
            <el-form-item label="部门" label-position="left">
                <el-select v-model="addForm.dept_no" placeholder="Select" style="width: 240px">
                    <el-option v-for="item in departmentOptions" :key="item.dept_no" :label="item.dept_name" :value="item.dept_no" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addManagement">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog v-model="dialogDeleteVisible" title="删除" width="400">
        <p>确定删除吗？</p>
        <el-button type="primary" @click="deleteManagement">确定</el-button>
        <el-button>取消</el-button>
    </el-dialog>
</template>

<script setup lang='ts'>
import { getDepartmentApi } from '@/api/department.api';
import { getEmployeeApi } from '@/api/employee.api';
import { getManagementApi, addManagementApi, deleteManagementApi } from '@/api/management.api';
import type { Department } from '@/model/department.model';
import type { Employee } from '@/model/employee.model';
import type { Management, GetManagementRes, AddManagementReq } from '@/model/management.model';
import { formatDate, formatStatus } from '@/utils/formatter';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const tableData = ref()
const employeeOptions = ref<Employee[]>()
const departmentOptions = ref<Department[]>()
const dialogEditVisible = ref(false)
const dialogDeleteVisible = ref(false)
const dialogAddVisible = ref(false)

const addForm = ref<AddManagementReq>({
    emp_no: 0,
    dept_no: 0,
})

async function getEmployee(){
    const res = await getEmployeeApi()
    if (res) {
        console.log(res);
        employeeOptions.value = res.list
    } else {
        ElMessage.error('获取数据失败')
    }
}

async function getDepartment(){
    const res = await getDepartmentApi()
    if (res) {
        console.log(res);
        departmentOptions.value = res.list
    } else {
        ElMessage.error('获取数据失败')
    }
}


const editFrom = ref<Management>({
    ed_id: 0,
    emp_no: 0,
    emp_name: '',
    dept_no: 0,
    dept_name: '',
    entry_date: '',
    leave_date: '',
    status: 0
})

function handleDelete(index: number, row: any) {
    console.log(index, row);
    dialogDeleteVisible.value = true
    editFrom.value = row
}

async function getManagement() {
    const res: GetManagementRes = await getManagementApi()
    if (res) {
        console.log(res);
        tableData.value = res.list
    } else {
        ElMessage.error('获取数据失败')
    }
}

async function addManagement() {
    dialogAddVisible.value = false
    const res = await addManagementApi(addForm.value)
    if (res) {
        console.log(res);
        getManagement()
        ElMessage.success('添加成功')
    } else {
        ElMessage.error('添加失败')
    }
}

async function deleteManagement() {
    console.log(editFrom.value);
    const res = await deleteManagementApi(editFrom.value.emp_no)
    if (res) {
        console.log(res);
        dialogDeleteVisible.value = false
        getManagement()
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
}

onMounted(() => {
    getManagement()
    getEmployee()
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