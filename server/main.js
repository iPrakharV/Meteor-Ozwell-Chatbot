import { Meteor } from 'meteor/meteor';
import '../imports/api/users';

Meteor.startup(() => {
  console.log('Meteor server started...');
});