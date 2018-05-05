import Vue from 'vue';
import Mint, { Indicator, Toast } from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(Mint);
Vue.prototype.$loading = Indicator;
Vue.prototype.$toast = Toast;
