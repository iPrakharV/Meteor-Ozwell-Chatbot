<template>
    <div>
      <h2>Login</h2>
      <input v-model="identifier" type="text" placeholder="Username or Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Login</button>
      <p v-if="error">{{ error }}</p>
      <router-link to="/register">Don't have an account? Register</router-link>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { Meteor } from 'meteor/meteor';
  
  export default {
    setup() {
      const identifier = ref('');
      const password = ref('');
      const error = ref('');
  
      const login = async () => {
        try {
          const userId = await Meteor.callAsync('users.login', identifier.value, password.value);
          console.log('User logged in:', userId);
        } catch (err) {
          error.value = err.reason || 'Login failed';
        }
      };
  
      return { identifier, password, login, error };
    }
  };
  </script>