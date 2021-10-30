import { createApp } from 'vue'

import App from './App.vue'
import Auth from './plugins/auth0'
import router from './router'

import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { WebSocketLink } from "@apollo/client/link/ws"



const getHeaders = () => {
  const headers = {}
  const token = window.localStorage.getItem(process.env.VUE_APP_STORAGE_KEY_NAME)
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return headers
}

const link = new WebSocketLink({
  uri: process.env.VUE_APP_WSS_HASURA_URL,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: () => {
      return { headers: getHeaders() }
    },
  }
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    loadingKey: 'loading',
    fetchPolicy: 'no-cache'
  }
})



async function init() {
  const AuthPlugin = await Auth.init({
    onRedirectCallback: (appState) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname,
      )
    },
  })

  const apolloProvider = createApolloProvider({
    defaultClient: client,
  })

  createApp(App).use(AuthPlugin).use(router).use(apolloProvider).mount('#app')
}

init()
