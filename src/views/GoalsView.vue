<template>

  <div class="site-background">
    <NavBar />

    <div class="goals-txt">
      <h2>Reading Goals</h2>
    </div>

  </div>
</template>


<script scoped>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'GoalsView',
  components: {
    NavBar
  }
}

</script>


<style scoped>
@font-face {
  font-family: 'Bookmania-Regular';
  src: url('../assets/Bookmania-Regular.otf') format('truetype');
}

.goals-txt {
  display: flex;
  align-content: flex-start;
  margin: auto;
  margin-top: 5px;
  margin-left: 30px;
  font-family: 'Bookmania-Regular';
}
</style>