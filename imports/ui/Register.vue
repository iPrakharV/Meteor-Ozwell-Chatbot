<template>
    <div>
      <h2>Register</h2>
      <input v-model="username" type="text" placeholder="Enter Username" />
      <input v-model="email" type="email" placeholder="Enter Email" />
      <input v-model="password" type="password" placeholder="Enter Password" />
      <button @click="register">Register</button>
      <p v-if="error">{{ error }}</p>
      <router-link to="/login">Already have an account? Login</router-link>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { Meteor } from 'meteor/meteor';
  
  export default {
    setup() {
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const error = ref('');
  
      const register = async () => {
        try {
          const userId = await Meteor.callAsync('users.register', username.value, email.value, password.value);
          console.log('User registered:', userId);
        } catch (err) {
          error.value = err.reason || 'Registration failed';
        }
      };
  
      return { username, email, password, register, error };
    }
  };
  </script>