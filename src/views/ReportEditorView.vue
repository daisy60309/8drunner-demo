<template>
  <MainLayout title="8D 案件處理">
    <el-card>
      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="案號">
              <el-input v-model="form.reportNo" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="客戶">
              <el-input v-model="form.customerName" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="狀態">
              <el-select v-model="form.status" style="width: 100%">
                <el-option label="草稿" value="草稿" />
                <el-option label="已開案" value="已開案" />
                <el-option label="已結案" value="已結案" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="問題描述">
          <el-input v-model="form.complaintText" type="textarea" :rows="3" />
        </el-form-item>

        <div style="display: flex; gap: 10px; margin-bottom: 20px">
          <el-button type="primary" @click="showSummaryMessage">AI 客訴摘要</el-button>
          <el-button type="success" @click="generateDraft">生成 8D 初稿</el-button>
          <el-button type="warning" @click="showCapaMessage">產生 CAPA 建議</el-button>
        </div>

        <el-tabs type="border-card">
          <el-tab-pane label="D1 團隊">
            <el-input v-model="form.d1" type="textarea" :rows="4" placeholder="尚未生成內容" />
          </el-tab-pane>
          <el-tab-pane label="D2 問題描述">
            <el-input v-model="form.d2" type="textarea" :rows="4" placeholder="尚未生成內容" />
          </el-tab-pane>
          <el-tab-pane label="D3 臨時措施">
            <el-input v-model="form.d3" type="textarea" :rows="4" placeholder="尚未生成內容" />
          </el-tab-pane>
          <el-tab-pane label="D4 根因分析">
            <el-input v-model="form.d4" type="textarea" :rows="4" placeholder="尚未生成內容" />
          </el-tab-pane>
          <el-tab-pane label="D5 永久對策">
            <el-input v-model="form.d5" type="textarea" :rows="4" placeholder="尚未生成內容" />
          </el-tab-pane>
          <el-tab-pane label="D6 驗證">
            <el-input v-model="form.d6" type="textarea" :rows="4" placeholder="尚未生成內容" />
          </el-tab-pane>
          <el-tab-pane label="D7 預防再發">
            <el-input v-model="form.d7" type="textarea" :rows="4" placeholder="尚未生成內容" />
          </el-tab-pane>
          <el-tab-pane label="D8 結案與回饋">
            <el-input v-model="form.d8" type="textarea" :rows="4" placeholder="尚未生成內容" />
          </el-tab-pane>
        </el-tabs>

        <div style="margin-top: 20px; text-align: right">
          <el-button>返回</el-button>
          <el-button type="primary">儲存內容</el-button>
        </div>
      </el-form>
    </el-card>
  </MainLayout>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import MainLayout from '../layouts/MainLayout.vue'

const form = reactive({
  reportNo: '8D-2026-001',
  customerName: 'ABC Electronics',
  status: '已開案',
  complaintText: '客戶反映到貨後發現外殼有裂痕，影響組裝與外觀。',
  d1: '',
  d2: '',
  d3: '',
  d4: '',
  d5: '',
  d6: '',
  d7: '',
  d8: '',
})

function generateDraft() {
  form.d1 = '已建立跨部門小組，包含業務、品保、製造與研發。'
  form.d2 = '客戶回報外殼裂痕，影響外觀與後續組裝。'
  form.d3 = '先隔離同批次產品，暫停出貨並通知品保複驗。'
  form.d4 = '初步研判為包材強度不足，搬運過程造成外殼受損。'
  form.d5 = '更換高強度包材，並增加內部緩衝保護。'
  form.d6 = '抽樣驗證改善後包裝，未再發現裂痕異常。'
  form.d7 = '將包材檢驗納入 SOP，並納入出貨前檢查項目。'
  form.d8 = '完成結案，並回饋改善成果給團隊與客戶。'

  ElMessage.success('已生成 8D 初稿')
}

function showSummaryMessage() {
  ElMessage.success('已完成客訴摘要')
}

function showCapaMessage() {
  ElMessage.success('已產生 3 筆 CAPA 建議')
}

onMounted(() => {
  const shouldGenerate = localStorage.getItem('generate8dDraft')
  if (shouldGenerate === '1') {
    generateDraft()
    localStorage.removeItem('generate8dDraft')
  }
})
</script>