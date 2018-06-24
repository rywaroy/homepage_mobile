import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('time', value => (
  dayjs(String(value).length <= 10 ? value * 1000 : value).format('YYYY-MM-DD HH:mm')
));

Vue.filter('getImgUrl', url => (
  url.replace(/http\w{0,1}:\/\//g, 'https://images.weserv.nl/?url=')
));
