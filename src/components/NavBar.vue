<template>
  <div>
    <div class="title">
      <img src="/src/assets/Leaves.png" style="transform:scaleX(-1);">
      <h1>My Little Library</h1>
      <img src="/src/assets/Leaves.png">
    </div>

    <div class="link-background link-style">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/LibraryView">Library</router-link>
      <router-link class="nav-link" to="/BrowseView">Browse</router-link>
      <router-link class="nav-link" to="/GoalsView">Goals</router-link>
    </div>
  </div>

</template>

<style>
@font-face {
  font-family: 'Blueberry';
  src: url('../assets/Blueberry.ttf');
}

.title {
  display: flex;
  text-align: center;
  font-size: medium;
  flex-direction: row;
  justify-content: center;
  font-family: 'Blueberry';
  color: #415b46;
}

.title>h1 {
  width: 20vw;
}

.title>img {
  width: 40vw;
}

.link-background {
  background-image: linear-gradient(#A8CA98, #5D8264);
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
  font-family: 'Blueberry';
}

.nav-link {
  color: beige;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #415b46;
}
</style>

<script>
export default {
  name: "NavBar"
}
</script>