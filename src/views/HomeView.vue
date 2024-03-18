<template>

<div class="site-background">
    
    <NavBar/>
    <div class = "welcome-txt">
      <p>Welcome to My Little Library</p>
    </div>
    
  </div>
</template>


<script>
import NavBar from '../components/NavBar.vue'

export default {
    name: 'HomeView',
    components: {
      NavBar
    }
}

</script>


<style scoped>

.welcome-txt {
  font-size: 50px;
  text-align: center;
}

</style>