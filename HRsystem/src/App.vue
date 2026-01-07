<script setup>
import MyBar from './views/mybar.vue'
import signup from './pages/signup.vue'
import dashboard from './pages/dashboard.vue'


</script>

<template>
  <div id="app" class="w-full min-h-screen">
     <Mybar /> 
    
     <div class="min-h-screen w-full">
      <router-view />
      
      
    </div>
    </div>
</template>

<script>
import Mybar from './views/mybar.vue'

export default {
  components: {
    Mybar,  signup, 
  }
}
</script>