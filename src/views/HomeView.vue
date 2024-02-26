<template>

<div class="site-background">
    <div class="title">
      <h1>My Little Library</h1>
    </div>

  <div class="direction-fix">
    <div class = "welcome-txt">
      <p>Welcome to My Little Library</p>
    </div>
  

    <div class="link-background link-style">
      <router-link to ="/" >Home</router-link>
      <router-link to = "/LibraryView" >Library</router-link>
      <router-link to = "/BrowseView">Browse</router-link>
      <router-link to = "/GoalsView">Goals</router-link>
    </div>

    <!-- <div class ="leaves-background">
      <p>hello (this is shown to show the different between tabs temp.)</p>
    </div> -->
    
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
  border-radius: 15px;
  background-image:linear-gradient(#A3B18A, #626d49);
  min-height: 100vh;
  /* margin may change */
  margin:-5px; 
}

.title{
  display:flex;
  text-align: center;
  font-size: large;
  flex-direction: column; 
}

.direction-fix {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.welcome-txt {
  display: flex;
  align-items: center;
  font-size: 40px;
  margin: auto;
  
}

.link-background {
  border-radius: 15px;
  background-image:linear-gradient(#A8CA98,#5D8264);
  display: flex;
  justify-content: center;
  width: 190px;
  /* height: 500px; */
  min-height: 90vh;
  align-self: flex-end;
  
  }

  .link-style {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 25px;
  }

  /* .leaves-background{
    border-radius: 15px;
    border-color: black;
    align-content:flex-end;
    width: 100px;
    height: 500px;
    text-align: center;
  } */
</style>