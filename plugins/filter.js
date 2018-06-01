import Vue from 'vue';
import moment from 'moment';

Vue.filter('time', value => (
  moment(String(value).length <= 10 ? value * 1000 : value).format('YYYY-MM-DD HH:mm')
));

Vue.filter('getImgUrl', url => (
  url.replace(/http\w{0,1}:\/\//g, 'https://images.weserv.nl/?url=')
));
