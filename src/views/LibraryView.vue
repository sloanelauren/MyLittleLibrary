<template>

  <div class="site-background">
      <div class="title">
        <h1>My Little Library</h1>
      </div>
  
      <div class ="leaves-background">
        <p>Library leaves (this is shown to show the different between tabs temp.)</p>
      </div>
  
      <div class="link-background link-style">
        <router-link to ="/" >Home</router-link>
        <router-link to = "/LibraryView" >Library</router-link>
        <router-link to = "/BrowseView">Browse</router-link>
        <router-link to = "/GoalsView">Goals</router-link>
      </div>
  
    </div>
  </template>
  
  
  <script scoped>
  export default {
      name: 'LibraryView',
  }
  </script>
  
  
  <style scoped>
  
  .site-background {
    display: flex;
    flex-direction: column; 
    border-radius: 15px;
    background-image:linear-gradient(#A3B18A, #626d49);
    min-height: 100vh;
    margin:-5px;
  }
  
  .title{
    text-align: center;
  
  }
  
  .link-background {
    border-radius: 15px;
    background-image:linear-gradient(#A8CA98,#5D8264);
    display: flex;
    justify-content: center;
    width: 225px;
    height: 500px;
    align-self: flex-end;
    }
  
    .link-style {
      display: flex;
      text-align: center;
      flex-direction: column;
      justify-content: space-evenly;
      font-size: 25px;
    }
  
    .leaves-background{
      border-radius: 15px;
      border-color: black;
      align-self: flex-end;  
    }
  </style>