import { createApp } from 'vue'

import App from './App.vue'
import Auth from './plugins/auth0'
import router from './router'

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

  createApp(App).use(AuthPlugin).use(router).mount('#app')
}

init()
