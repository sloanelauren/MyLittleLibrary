<template>

  <div class="site-background">

    <NavBar/>
      <div>
        <h2>Library</h2>
      </div>
      
    </div>
  </template>
  
  
  <script scoped>
  import NavBar from '../components/NavBar.vue';

  export default {
      name: 'LibraryView',
      components: {
        NavBar
      }
  }
  
  </script>
  
  
  <style scoped>
   
  </style>