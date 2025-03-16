import { Meteor } from 'meteor/meteor';
import { createApp } from 'vue';
import App from '/imports/ui/App.vue';
import router from '../imports/ui/router.js';

Meteor.startup(() => {
  createApp(App).use(router).mount('#app');
});