<template>
  <div class="app-content">
    <div class="scroll plan-content" v-if="planList.length > 0">
      <div v-for="(item, index) in planList" :key="index">
        <div class="plan-title">{{item.title}}</div>
        <ve-pie :data="item.PieData"></ve-pie>
        <ve-bar :data="item.BarData"></ve-bar>
      </div>
    </div>
  </div>
</template>

<script>
import VePie from 'v-charts/lib/pie.common';
import VeBar from 'v-charts/lib/bar.common';
import axiosPlugin from '@/plugins/axios';

export default {
  async fetch({ store }) {
    if (store.state.blog.planList.length === 0) {
      const res = await axiosPlugin.axios.get('plan/analysis');
      const data = res.data.data;
      for (let i = 0; i < data.length; i++) {
        data[i].PieData = {
          columns: ['是否打卡', '数量'],
          rows: [
            { 是否打卡: '已打卡', 数量: data[i].successTotal },
            { 是否打卡: '未打卡', 数量: data[i].failTotal },
          ],
        };
        data[i].BarData = {
          columns: ['日期', '已打卡', '未打卡', '打卡率'],
          rows: [],
        };
        for (let j = 0; j < data[i].date.length; j++) {
          data[i].BarData.rows.push({
            日期: data[i].date[j],
            已打卡: data[i].success[j],
            未打卡: data[i].fail[j],
            打卡率: data[i].success[j] / (data[i].success[j] + data[i].fail[j]),
          });
        }
      }
      store.commit('blog/setPlanList', res.data.data);
    }
    store.commit('blog/setTitle', '相册');
  },
  computed: {
    planList() {
      return this.$store.state.blog.planList;
    },
  },
  components: {
    VePie,
    VeBar,
  },
};
</script>

<style>
.plan-content {
  background: #fff;
}

.plan-title {
  font-size: 18px;
  line-height: 24px;
  padding: 10px 0;
  text-align: center;
  margin-bottom: 10px;
}
</style>
