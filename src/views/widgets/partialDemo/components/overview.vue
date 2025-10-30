<template>
  <div class="overview-container">
    <div class="overview-item">
      <div>模板</div>
      <div>
        <p class="value">{{ state.processTemplateTotal }}</p>
        <p class="label">审批流程模板总数</p>
      </div>
      <div>
        <p class="value">{{ state.processTemplateToday }}</p>
        <p class="label">今日新增数</p>
      </div>
    </div>
    <div class="overview-item">
      <div>审批单</div>
      <div>
        <p class="value">{{ state.processInstanceTotal }}</p>
        <p class="label">全部审批单数</p>
      </div>
      <div>
        <p class="value">{{ state.processInstanceToday }}</p>
        <p class="label">今日审批单数</p>
      </div>
    </div>
    <div class="overview-item">
      <div>审批<br />状态</div>
      <div>
        <p class="value" style="cursor: pointer;">{{ state.processInstanceApproved }}/{{
          state.processInstanceTotal - state.processInstanceApproved }}</p>
        <p class="label">今日已审批数/未审批数</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const state = reactive<any>({
  processTemplateTotal: 0, // 审批模板总数
  processTemplateToday: 0, // 今日新增审批模板数
  processInstanceTotal: 0, // 审批单总数
  processInstanceToday: 0, // 今日审批单数
  processInstanceApproved: 0, // 今日已审批数
});
</script>

<style scoped lang='scss'>
.overview-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .overview-item {
    padding: 0 16px;
    display: grid;
    grid-template-columns: 48px 120px 1fr;
    height: 74px;
    overflow: hidden;
    align-items: center;
    gap: 12px;
    background-image: url('@/assets/images/dpi/today-dpi-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 4px;
    border: 1px solid #D9D9D9;

    >div:first-of-type {
      display: flex;
      justify-content: center;
      background-image: url('@/assets/images/dpi/dpi-label-bg.png');
      background-size: 48px 48px;
      background-repeat: no-repeat;
      height: 48px;
      line-height: 46px;
      font-weight: 500;
      font-size: 14px;
      color: #FFFFFF;
    }

    .label {
      font-weight: 400;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      line-height: 26px;
    }

    .value {
      line-height: 26px;
      font-family: AgencyFB, AgencyFB;
      font-weight: bold;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.8);
    }

    &:nth-child(2) {
      background-image: url('@/assets/images/dpi/today-dpi-bg2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;

      >div:first-of-type {
        font-size: 12px;
      }
    }

    &:nth-child(3) {
      background-image: url('@/assets/images/dpi/today-dpi-bg2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;

      >div:first-of-type {
        font-size: 12px;
        line-height: 14px;
        align-items: center;
        padding-bottom: 2px;
      }

      grid-template-columns: 48px 1fr;
    }
  }
}
</style>