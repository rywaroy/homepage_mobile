import Vue from 'vue';
import moment from 'moment';

Vue.filter('time', value => (
  moment(value).format('YYYY-MM-DD HH:mm')
));
