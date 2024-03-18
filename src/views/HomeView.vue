<template>

<div class="site-background">
    <div class="title">
      <img src="/src/assets/Leaves.png" style ="transform:scaleX(-1);">
      <h1>My Little Library</h1>
      <img src="/src/assets/Leaves.png">
    </div>

    <div class="link-background link-style">
      <router-link class = "nav-link" to ="/" >Home</router-link>
      <router-link class = "nav-link" to = "/LibraryView" >Library</router-link>
      <router-link class = "nav-link" to = "/BrowseView">Browse</router-link>
      <router-link class = "nav-link" to = "/GoalsView">Goals</router-link>
    </div>

    <div class = "welcome-txt">
      <p>Welcome to My Little Library</p>
    </div>
    
  </div>
</template>


<script scoped>
export default {
    name: 'HomeView',
}

</script>


<style scoped>

.site-background {
  background-color: beige;
  min-height: 100vh;
  margin: -8px; 
}

.title{
  display:flex;
  text-align: center;
  font-size: large;
    /* i did below */
  flex-direction: row; 
  justify-content: center; 
}
.title > h1 {
  width: 20vw;
}
/* i did this below */
.title > img {
  width: 40vw;
}


.welcome-txt {
  font-size: 50px;
  text-align: center;
}

.link-background {
  background-image:linear-gradient(#A8CA98,#5D8264);
  display: flex;
  justify-content: center;
  width: auto;
  min-height: 35px;
  
  }

  .link-style {
    display: flex;
    text-align: center;
    flex-direction: row;
    justify-content: space-evenly;
    font-size: 25px;
  }

  .nav-link {
        color:beige;
        text-decoration: none;
        transition: color 0.3s;
      }

      .nav-link:hover {
        color: black;
      }



</style>