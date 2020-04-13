import Spotlight from './Spotlight.vue';

export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('Spotlight', Spotlight);
} 
 
const plugin = {
    install
};

let GlobalVue = null;

if (typeof windows !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}

if (GlobalVue) {
    GlobalVue.use(plugin)
}

export default Spotlight;
