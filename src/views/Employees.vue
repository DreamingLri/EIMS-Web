<template>
    <div class="main">
        <p>员工信息管理</p>
        <el-button @click="dialogAddVisible = true" type="primary" round style="width: 100px;">添加员工</el-button>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
            <el-table-column fixed prop="emp_no" label="工号" width="100" />
            <el-table-column prop="first_name" label="名" width="100" />
            <el-table-column prop="last_name" label="姓" width="100" />
            <el-table-column prop="gender" label="性别" width="100" :formatter="formatGender"/>
            <el-table-column prop="hire_date" label="入职日期" width="100" :formatter="formatDate"/>
            <el-table-column prop="birthday" label="出生日期" width="120" :formatter="formatDate"/>
            <el-table-column prop="address" label="地址" width="100" show-overflow-tooltip />
            <el-table-column prop="telephone" label="联系电话" width="100" />
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
            <el-form-item label="名" label-position="left">
                <el-input v-model="addForm.first_name" />
            </el-form-item>
            <el-form-item label="姓" label-position="left">
                <el-input v-model="addForm.last_name" />
            </el-form-item>
            <el-form-item label="性别" label-position="left">
                <el-select v-model="addForm.gender" placeholder="Select" size="large" style="width: 240px">
                    <el-option label="男" :value="0" />
                    <el-option label="女" :value="1" />
                    <el-option label="其他" :value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="入职日期" label-position="left">
                <el-date-picker v-model="addForm.hire_date" type="date" placeholder="选择一天" />
            </el-form-item>
            <el-form-item label="出生日期" label-position="left">
                <el-date-picker v-model="addForm.birthday" type="date" placeholder="选择一天" />
            </el-form-item>
            <el-form-item label="地址" label-position="left">
                <el-input v-model="addForm.address" />
            </el-form-item>
            <el-form-item label="联系电话" label-position="left">
                <el-input v-model="addForm.telephone" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addEmployee">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog v-model="dialogEditVisible" title="编辑" width="800" style="border-radius: 20px;">
        <el-form :model="editFrom" label-width="auto" style="max-width: 600px">
            <el-form-item label="工号" label-position="left">
                <el-input v-model="editFrom.emp_no" />
            </el-form-item>
            <el-form-item label="名" label-position="left">
                <el-input v-model="editFrom.first_name" />
            </el-form-item>
            <el-form-item label="姓" label-position="left">
                <el-input v-model="editFrom.last_name" />
            </el-form-item>
            <el-form-item label="性别" label-position="left">
                <el-select v-model="editFrom.gender" placeholder="Select" size="large" style="width: 240px">
                    <el-option label="男" :value="0" />
                    <el-option label="女" :value="1" />
                    <el-option label="其他" :value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="入职日期" label-position="left">
                <el-date-picker v-model="editFrom.hire_date" type="date" placeholder="选择一天" />
            </el-form-item>
            <el-form-item label="出生日期" label-position="left">
                <el-date-picker v-model="editFrom.birthday" type="date" placeholder="选择一天" />
            </el-form-item>
            <el-form-item label="地址" label-position="left">
                <el-input v-model="editFrom.address" />
            </el-form-item>
            <el-form-item label="联系电话" label-position="left">
                <el-input v-model="editFrom.telephone" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateEmployee">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog v-model="dialogDeleteVisible" title="删除" width="400">
        <p>确定删除吗？</p>
        <el-button type="primary" @click="deleteEmployee">确定</el-button>
        <el-button>取消</el-button>
    </el-dialog>
</template>

<script setup lang='ts'>
import { getEmployeeApi, addEmployeeApi, updateEmployeeApi, deleteEmployeeApi } from '@/api/employee.api';
import type { Employee, GetEmployeeRes } from '@/model/employee.model';
import { formatDate, formatGender } from '@/utils/formatter';
import { ElMessage, formatter } from 'element-plus';
import { onMounted, ref } from 'vue';

const tableData = ref()
const dialogEditVisible = ref(false)
const dialogDeleteVisible = ref(false)
const dialogAddVisible = ref(false)

const addForm = ref<Employee>({
    emp_no: 0,
    first_name: '',
    last_name: '',
    gender: 0,
    hire_date: '',
    birthday: '',
    address: '',
    telephone: ''
})


const editFrom = ref<Employee>({
    emp_no: 0,
    first_name: '',
    last_name: '',
    gender: 0,
    hire_date: '',
    birthday: '',
    address: '',
    telephone: ''
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

async function getEmployee() {
    const res: GetEmployeeRes = await getEmployeeApi()
    if (res) {
        console.log(res);
        tableData.value = res.list
    } else {
        ElMessage.error('获取数据失败')
    }
}

async function addEmployee() {
    dialogAddVisible.value = false
    const res = await addEmployeeApi(addForm.value)
    if (res) {
        console.log(res);
        getEmployee()
        ElMessage.success('添加成功')
    } else {
        ElMessage.error('添加失败')
    }
}

async function updateEmployee() {
    const res = await updateEmployeeApi(editFrom.value)
    if (res) {
        console.log(res);
        dialogEditVisible.value = false
        getEmployee()
        ElMessage.success('更新成功')
    } else {
        ElMessage.error('更新失败')
    }
}

async function deleteEmployee() {
    console.log(editFrom.value);
    const res = await deleteEmployeeApi(editFrom.value.emp_no)
    if (res) {
        console.log(res);
        dialogDeleteVisible.value = false
        getEmployee()
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
}

onMounted(() => {
    getEmployee()
})
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    padding: 20px;
}
</style>