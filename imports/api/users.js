import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
  async 'users.register'(username, email, password) {
    check(username, String);
    check(email, String);
    check(password, String);

    if (!username || !email || !password) {
      throw new Meteor.Error('missing-fields', 'Username, Email, and Password are required.');
    }

    const userId = Accounts.createUser({ username, email, password });
    return userId;
  },

  async 'users.login'(username, password) {
    check(username, String);
    check(password, String);

    const user = await Meteor.users.findOneAsync({ username });

    if (!user) {
      throw new Meteor.Error('user-not-found', 'User does not exist.');
    }

    const result = Accounts._checkPassword(user, password);
    if (result.error) {
      throw new Meteor.Error('incorrect-password', 'Incorrect password.');
    }

    return user._id;
  },

  async 'users.updateProfile'(phone) {
    check(phone, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (!/^\d+$/.test(phone)) {
      throw new Meteor.Error('invalid-phone', 'Phone number must contain only digits.');
    }

    await Meteor.users.updateAsync(this.userId, {
      $set: { 'profile.phone': phone }
    });

    return 'Phone number updated successfully.';
  }
});

// Create a test user when the server starts (for local development)
Meteor.startup(async () => {
  const testUsername = process.env.TEST_USERNAME;
  const testEmail = process.env.TEST_EMAIL;
  const testPassword = process.env.TEST_PASSWORD;

  if (testUsername && testEmail && testPassword) {
    if (!await Meteor.users.findOneAsync({ username: testUsername })) {
      Accounts.createUser({
        username: testUsername,
        email: testEmail,
        password: testPassword
      });
      console.log(`Test user created: username="${testUsername}", password="${testPassword}"`);
    }
  } else {
    console.log("Test user credentials not set in .env file.");
  }
});