<template>
  <div id="nav">
    <div v-if="Auth.user">
    {{Auth}}
    </div>
    <br/>
    <h5>Auth.isAuthenticated: {{Auth.isAuthenticated}}</h5>
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
  </div>
  <router-view/>
</template>


<script>
import { inject } from 'vue';

export default {
  name: 'Home',
  components: {

  },
  inject:  ['Auth'],
  methods: {
    login() {
        this.Auth.loginWithRedirect();
    },
    logout() {
        this.Auth.logout();
        this.$router.push({path: "/"});
    }
  },
  setup() {
    const auth = inject("Auth");
    return {
        ...auth
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
