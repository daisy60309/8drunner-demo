<template>
  <MainLayout title="營運總覽">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div style="font-size: 14px; color: #64748b">總案件數</div>
          <div style="font-size: 32px; font-weight: bold; margin-top: 10px">12</div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <div style="font-size: 14px; color: #64748b">進行中案件</div>
          <div style="font-size: 32px; font-weight: bold; margin-top: 10px">5</div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <div style="font-size: 14px; color: #64748b">逾期 CAPA</div>
          <div style="font-size: 32px; font-weight: bold; margin-top: 10px">2</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px">
      <template #header>
        <div style="font-weight: bold">本週重點</div>
      </template>
      <p>1. 客訴案件可快速建立 8D。</p>
      <p>2. AI 可協助摘要與 CAPA 建議。</p>
      <p>3. Dashboard 可追蹤案件狀態與風險。</p>
    </el-card>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue'
</script>