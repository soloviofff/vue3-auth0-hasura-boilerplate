<template>
  <div id="nav">
    <h5>Auth info: isAuthenticated {{Auth.isAuthenticated}}</h5>
    <div v-if="Auth.user">
      {{Auth}}
    </div>
    <br/>
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
    

    <h5>Users by query</h5>
    <div v-if="loadingQuery">Loading .... Please wait</div>
    <div v-if="quieryUsersComputed">
      {{quieryUsersComputed}}
    </div>

   
    <div v-if="usersComputed">
      <h5>Users by subscription</h5>
      {{usersComputed}}
    </div>
  </div>
  <router-view/>
</template>


<script>
import gql from "graphql-tag"

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
    },
    fetchUsers() {
      this.loadingQuery = true
      this.$apollo.query({
        query: gql`
          query {
            users {
              auth0_id
              avatar
              created_at
              email
              last_seen
              name
            }
          }`
      }).then(({data, loading}) => {
        this.loadingQuery = loading
        this.queryUsers = data.users
      })
    },
    // editUser() {
    //   const result = await this.$apollo.mutate({
    //       mutation: update_user_info_mutation,
    //       variables: {
    //         auth0_id: this.get_auth0_id,
    //         avatar: user.new_avatar,
    //         first_name: user.first_name,
    //         second_name: user.second_name,
    //         name: user.nickname
    //       }
    //     })

    // }
  },
  mounted(){
    this.fetchUsers()
    // this.subscribeUsers()
  },
  data () {
    return {
      usersSubscribe: [],
      queryUsers: [],
      loadingQuery: false
    }
  },
  computed: {
    usersComputed() {
      return this.usersSubscribe
    },
    quieryUsersComputed() {
      return this.queryUsers
    }
  },
  apollo: {
    $subscribe: {
      users: {
        query: gql`
          subscription {
            users {
              auth0_id
              avatar
              created_at
              last_seen
              name
            }
          }
        `,
        result ({data}) {
          // console.log(data)
          this.usersSubscribe = data.users
        },
      },
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
