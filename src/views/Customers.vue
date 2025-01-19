<template>
    <div class="main">
        <p>客户信息管理</p>
        <el-button @click="dialogAddVisible = true" type="primary" round style="width: 100px;">添加客户</el-button>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
            <el-table-column fixed prop="customer_id" label="客户编号" width="100" />
            <el-table-column prop="customer_name" label="客户姓名" width="100" />
            <el-table-column prop="company" label="单位" width="100" />
            <el-table-column prop="sex" label="性别" width="100" />
            <el-table-column prop="age" label="年龄" width="100" />
            <el-table-column prop="telephone" label="联系电话" width="120" />
            <el-table-column prop="address" label="联系地址" width="100" show-overflow-tooltip />
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
            <el-form-item label="客户姓名" label-position="left">
                <el-input v-model="addForm.customer_name" />
            </el-form-item>
            <el-form-item label="单位" label-position="left">
                <el-input v-model="addForm.company" />
            </el-form-item>
            <el-form-item label="性别" label-position="left">
                <el-input v-model="addForm.sex" />
            </el-form-item>
            <el-form-item label="年龄" label-position="left">
                <el-input-number v-model="addForm.age" />
            </el-form-item>
            <el-form-item label="联系电话" label-position="left">
                <el-input v-model="addForm.telephone" />
            </el-form-item>
            <el-form-item label="联系地址" label-position="left">
                <el-input v-model="addForm.address" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addCustomer">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog v-model="dialogEditVisible" title="编辑" width="800" style="border-radius: 20px;">
        <el-form :model="editFrom" label-width="auto" style="max-width: 600px">
            <el-form-item label="客户编号" label-position="left">
                <el-input v-model="editFrom.customer_id" disabled/>
            </el-form-item>
            <el-form-item label="客户姓名" label-position="left">
                <el-input v-model="editFrom.customer_name" />
            </el-form-item>
            <el-form-item label="单位" label-position="left">
                <el-input v-model="editFrom.company" />
            </el-form-item>
            <el-form-item label="性别" label-position="left">
                <el-input v-model="editFrom.sex" />
            </el-form-item>
            <el-form-item label="年龄" label-position="left">
                <el-input-number v-model="editFrom.age" />
            </el-form-item>
            <el-form-item label="联系电话" label-position="left">
                <el-input v-model="editFrom.telephone" />
            </el-form-item>
            <el-form-item label="联系地址" label-position="left">
                <el-input v-model="editFrom.address" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateCustomer">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog v-model="dialogDeleteVisible" title="删除" width="400">
        <p>确定删除吗？</p>
        <el-button type="primary" @click="deleteCustomer">确定</el-button>
        <el-button>取消</el-button>
    </el-dialog>
</template>

<script setup lang='ts'>
import { addCustomerApi, deleteCustomerApi, getCustomerApi, updateCustomerApi } from '@/api/customer.api';
import type { Customer, GetCustomerRes } from '@/model/customer.model';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const tableData = ref()
const dialogEditVisible = ref(false)
const dialogDeleteVisible = ref(false)
const dialogAddVisible = ref(false)

const addForm = ref<Customer>({
    customer_id: 0,
    customer_name: '',
    company: '',
    sex: '',
    age: 0,
    telephone: '',
    address: ''
})


const editFrom = ref<Customer>({
    customer_id: 0,
    customer_name: '',
    company: '',
    sex: '',
    age: 0,
    telephone: '',
    address: ''
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

async function getCustomers() {
    const res: GetCustomerRes = await getCustomerApi()
    if (res) {
        console.log(res);
        tableData.value = res.list
    } else {
        ElMessage.error('获取数据失败')
    }
}

async function addCustomer() {
    dialogAddVisible.value = false
    const res = await addCustomerApi(addForm.value)
    if (res) {
        console.log(res);
        getCustomers()
        ElMessage.success('添加成功')
    } else {
        ElMessage.error('添加失败')
    }
}

async function updateCustomer() {
    const res = await updateCustomerApi(editFrom.value)
    if (res) {
        console.log(res);
        dialogEditVisible.value = false
        getCustomers()
        ElMessage.success('更新成功')
    } else {
        ElMessage.error('更新失败')
    }
}

async function deleteCustomer() {
    console.log(editFrom.value);
    const res = await deleteCustomerApi(editFrom.value.customer_id)
    if (res) {
        console.log(res);
        dialogDeleteVisible.value = false
        getCustomers()
        ElMessage.success('删除成功')
    } else {
        ElMessage.error('删除失败')
    }
}

onMounted(() => {
    getCustomers()
})
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    padding: 20px;
}
</style>