import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', function (value) {
  // 返回处理后的值
  return moment(value).format('YYYY-MM-DD HH:mm')
})
