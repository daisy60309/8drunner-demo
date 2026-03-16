<template>
  <div
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
    "
  >
    <el-card style="width: 420px; border-radius: 16px">
      <template #header>
        <div style="font-size: 24px; font-weight: bold">8DRunner 登入</div>
      </template>

      <el-form label-position="top">
        <el-form-item label="帳號">
          <el-input placeholder="請輸入帳號" />
        </el-form-item>

        <el-form-item label="密碼">
          <el-input type="password" placeholder="請輸入密碼" show-password />
        </el-form-item>

        <el-button type="primary" style="width: 100%">登入</el-button>
      </el-form>
    </el-card>
  </div>
</template>