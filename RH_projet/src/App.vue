<script>
import { ref } from 'vue'
import checkUserConnexion from './helpers/getters.js'
import loginForm from './components/loginForm.vue'
import homepageHR from './components/homepageHR.vue'
import SideBar from './components/sideBar.vue'

export default {
  name: 'App',
  components:{
    loginForm,
    homepageHR
  },
  setup(){ // si user non-co => loginForm
    let activeComponent = ref('loginForm')
    const user = checkUserConnexion()
    console.log("user : ", user)
    if(!user){
      console.log("!user")
      activeComponent.value = 'loginForm'
    }else {
      activeComponent.value = 'homepage'
    }
    return { activeComponent }
  }
}
</script>

<template> 
  <component :is="activeComponent" />
</template>