<template>
  <el-container style="min-height: 100vh">
    <el-aside width="220px" style="background: #0f172a; color: #fff">
      <div style="padding: 20px; font-size: 22px; font-weight: bold; border-bottom: 1px solid #1e293b;">
        8DRunner
      </div>

      <el-menu
        router
        background-color="#0f172a"
        text-color="#cbd5e1"
        active-text-color="#ffffff"
        style="border-right: none"
      >
        <el-menu-item index="/dashboard">營運總覽</el-menu-item>
        <el-menu-item index="/intake">快速開案</el-menu-item>
        <el-menu-item index="/complaints">案件列表</el-menu-item>
        <el-menu-item index="/report">8D 處理</el-menu-item>
        <el-menu-item index="/login">平台登入</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header
        style="
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div style="font-size: 20px; font-weight: 600">{{ title }}</div>
      </el-header>

      <el-main style="background: #f8fafc">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '8DRunner',
  },
})
</script>