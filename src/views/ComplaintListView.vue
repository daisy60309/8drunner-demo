<template>
  <MainLayout title="案件列表">
    <el-card>
      <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
        <el-input style="width: 300px" placeholder="搜尋案號 / 客戶 / 標題" />
        <el-button type="primary" @click="$router.push('/report')">新增案件</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="reportNo" label="案號" width="140" />
        <el-table-column prop="customer" label="客戶" width="180" />
        <el-table-column prop="title" label="問題標題" />
        <el-table-column prop="status" label="狀態" width="120" />
        <el-table-column label="操作" width="140">
          <template #default="scope">
            <el-button size="small" @click="$router.push(`/report/${scope.row.id}`)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue'

const tableData = [
  {
    id: 1,
    reportNo: '8D-2026-001',
    customer: 'ABC Electronics',
    title: '產品外殼裂痕客訴',
    status: 'Open',
  },
  {
    id: 2,
    reportNo: '8D-2026-002',
    customer: 'XYZ Industrial',
    title: '出貨數量短缺',
    status: 'Draft',
  },
  {
    id: 3,
    reportNo: '8D-2026-003',
    customer: 'Demo Customer',
    title: '功能異常',
    status: 'Closed',
  },
]
</script>