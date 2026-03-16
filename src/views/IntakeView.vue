<template>
  <MainLayout title="客訴受理">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card>
          <template #header>
            <div style="font-weight: bold">客訴內容輸入</div>
          </template>

          <el-form label-position="top">
            <el-form-item label="客訴內容">
              <el-input
                v-model="complaintText"
                type="textarea"
                :rows="10"
                placeholder="請貼上客訴內容，例如：客戶反映 2026/03/12 到貨後發現外殼裂痕，產品型號 XR-210，批號 B20260311A..."
              />
            </el-form-item>

            <el-form-item label="附件（原型展示）">
              <el-upload
                v-model:file-list="fileList"
                action="#"
                :auto-upload="false"
                multiple
              >
                <el-button>選擇附件</el-button>
              </el-upload>
            </el-form-item>

            <div style="display: flex; gap: 10px">
              <el-button type="primary" :loading="loading" @click="handleCreateCase">
                貼上→開案
              </el-button>
              <el-button @click="fillDemoText">帶入範例內容</el-button>
              <el-button @click="resetForm">清除內容</el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card>
          <template #header>
            <div style="font-weight: bold">案件狀態</div>
          </template>

          <div style="display: flex; flex-direction: column; gap: 12px">
            <el-alert
              title="案件已建立｜請確認欄位"
              type="success"
              :closable="false"
              v-if="opened"
            />
            <el-alert
              title="待受理"
              type="info"
              :closable="false"
              v-else
            />

            <el-tag type="warning" v-if="opened && missingFields.length > 0">
              待補資料 {{ missingFields.length }} 項
            </el-tag>

            <el-tag type="success" v-if="opened && missingFields.length === 0">
              資料已完整
            </el-tag>
          </div>
        </el-card>

        <el-card style="margin-top: 20px">
          <template #header>
            <div style="font-weight: bold">系統辨識結果</div>
          </template>

          <el-descriptions :column="1" border>
            <el-descriptions-item label="案號">
              {{ parsed.reportNo || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="客戶">
              {{ parsed.customerName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="產品">
              {{ parsed.productName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="嚴重度">
              {{ parsed.severity || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="摘要">
              {{ parsed.summary || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="狀態">
              {{ parsed.status || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px">
      <template #header>
        <div style="font-weight: bold">待補資料提醒</div>
      </template>

      <template v-if="opened">
        <el-table :data="missingFields" style="width: 100%">
          <el-table-column prop="field" label="缺漏欄位" width="180" />
          <el-table-column prop="owner" label="建議補件對象" width="180" />
          <el-table-column prop="note" label="說明" />
        </el-table>

        <div v-if="missingFields.length === 0" style="color: #16a34a; margin-top: 8px">
          目前沒有缺漏欄位。
        </div>
      </template>

      <template v-else>
        <div style="color: #64748b">請先完成開案，系統將顯示待補資料提醒。</div>
      </template>
    </el-card>

    <el-card style="margin-top: 20px">
      <template #header>
        <div style="font-weight: bold">後續作業</div>
      </template>

      <div style="display: flex; gap: 10px; flex-wrap: wrap">
        <el-button type="success" :disabled="!opened" @click="goReport">
          前往 8D 處理
        </el-button>
        <el-button type="warning" :disabled="!opened" @click="showDraftMessage">
          生成 8D 初稿
        </el-button>
        <el-button :disabled="!opened" @click="showCapaMessage">
          產生 CAPA 建議
        </el-button>
      </div>
    </el-card>
  </MainLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import MainLayout from '../layouts/MainLayout.vue'

const router = useRouter()

const loading = ref(false)
const opened = ref(false)
const complaintText = ref('')
const fileList = ref([])

const parsed = reactive({
  reportNo: '',
  customerName: '',
  productName: '',
  severity: '',
  summary: '',
  status: '',
})

const missingFields = ref([])

function fillDemoText() {
  complaintText.value = `Subject: XR-210 批次產品外殼裂損問題，請協助確認

您好，

我們在今日收貨並進行現場點收時，發現本次到貨的 XR-210 產品中，有部分機台外殼右上角出現明顯裂痕，且其中幾台在組裝時有卡住情況，已影響現場作業與外觀判定。

目前初步檢查共發現 3 台異常，異常品已先行隔離，暫停投入後續組裝流程。由於此批產品預計本週需安排出貨，擔心後續可能影響交期，請貴司協助儘速確認問題原因，並提供臨時處置方式與後續改善對策。

若需要，我們可再補充異常照片。不過目前現場尚未整理完整批號資訊，也還沒有統計整批不良比例，發生條件也需要再與產線人員確認。

請協助先行開案處理，並提供初步回覆，謝謝。

Best regards,
Kevin Chen
QA Engineer
ABC Electronics`
}

function resetForm() {
  complaintText.value = ''
  fileList.value = []
  opened.value = false

  parsed.reportNo = ''
  parsed.customerName = ''
  parsed.productName = ''
  parsed.severity = ''
  parsed.summary = ''
  parsed.status = ''

  missingFields.value = []
}

function handleCreateCase() {
  if (!complaintText.value.trim()) {
    ElMessage.warning('請先貼上客訴內容')
    return
  }

  loading.value = true

  setTimeout(() => {
    parsed.reportNo = `8D-${new Date().getFullYear()}-00${Math.floor(Math.random() * 9) + 1}`
    parsed.customerName = complaintText.value.includes('ABC Electronics') ? 'ABC Electronics' : '待確認'
    parsed.productName = complaintText.value.includes('XR-210') ? 'XR-210' : '待確認'
    parsed.severity = complaintText.value.includes('裂痕') ? '高' : '中'
    parsed.summary = '客戶反映 XR-210 外殼裂痕，已影響組裝與外觀判定。'
    parsed.status = '已開案'

    missingFields.value = [
      { field: '批號', owner: '業務 / 品保', note: '需補充問題批次資訊' },
      { field: '不良率', owner: '品保', note: '需提供異常數量或比率' },
      { field: '發生條件', owner: '製造 / 現場', note: '需釐清發生時間與操作情境' },
    ]

    opened.value = true
    loading.value = false
    ElMessage.success('已完成開案，請確認欄位內容')
  }, 900)
}

function goReport() {
  router.push('/report')
}

function showDraftMessage() {
  localStorage.setItem('generate8dDraft', '1')
  ElMessage.success('已送出 8D 初稿生成指令')
  router.push('/report')
}

function showCapaMessage() {
  ElMessage.success('已產生 3 筆 CAPA 建議')
}
</script>