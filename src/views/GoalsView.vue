<template>

  <div class="site-background">
    <NavBar />

    <div class="goals-txt">
      <h2>Reading Goals</h2>
    </div>

    <div class="total-read">
      <h3>Total Books Read</h3>
    </div>

    <div class="total-read">
      <p>{{ totalbooksread }}</p>
    </div>

    <div class="total-read">
      <h3>Set a Reading Goal</h3>
    </div>

    <div class="search-bar">
      <input type="text" v-model="readingGoal" placeholder="Set Reading Goal" @keyup.enter="startTracking">
      <button @click="startTracking">Start</button>
    </div>

    <div class="current-read-goal">
      <h3>Your Current Reading Goal</h3>
    </div>

    <div class="total-read" v-if="tracking">
      <p>
        {{ currentProgress }} out of {{ readingGoal }}
      </p>
    </div>

    <div class="total-read">
      <h3>Completed Reading Goals</h3>
    </div>

    <div class="total-read">
      <p v-for="(goal, index) in reversedCompletedGoals" :key="index">
        Goal: {{ goal.goal }}, Books Read: {{ goal.bookCounter }}, Completed On: {{ goal.timestamp }}
      </p>
    </div>

  </div>
</template>


<script scoped>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'GoalsView',
  components: {
    NavBar
  },

  data() {
    return {
      totalbooksread: 0,
      readingGoal: null,
      tracking: true,
      readinggoalprogress: 0,
      timestamp: null,
      completedGoals: []
    };
  },

  mounted() {
    const booksRead = JSON.parse(localStorage.getItem("booksRead"));
    this.totalbooksread = booksRead ? booksRead.length : 0;
    this.readingGoal = localStorage.getItem("readingGoal") || null;
    this.readinggoalprogress = parseInt(localStorage.getItem("bookCounter")) || 0;

    const storedCompletedGoals = JSON.parse(localStorage.getItem("completedGoals"));
    if (storedCompletedGoals) {
      this.completedGoals = storedCompletedGoals;
    }

    this.checkProgress();
  },

  computed: {
    currentProgress() {
      if (this.tracking) {
        return this.readinggoalprogress;
      } else {
        return 0;
      }
    },
    reversedCompletedGoals() {
      return this.completedGoals.slice().reverse();
    }
  },
  methods: {
    startTracking() {
      if (this.readingGoal !== null) {
        this.tracking = true;
        localStorage.setItem("readingGoal", this.readingGoal);
        const timestamp = new Date().toLocaleString();
        localStorage.setItem("starttimestamp", timestamp);
      }
    },
    checkProgress() {
      if (this.readinggoalprogress >= parseInt(this.readingGoal)) {
        const timestamp = new Date().toLocaleDateString();
        const newGoal = { goal: this.readingGoal, bookCounter: this.readinggoalprogress, timestamp };
        const storedGoals = JSON.parse(localStorage.getItem("completedGoals")) || [];
        storedGoals.push(newGoal);
        this.completedGoals = storedGoals;
        localStorage.setItem("completedGoals", JSON.stringify(storedGoals));

        this.resetGoal();
      }
    },
    resetGoal() {
      this.tracking = false;
      this.readingGoal = null;
      this.readinggoalprogress = 0;
      localStorage.removeItem("bookCounter");
    }
  }
}

</script>


<style scoped>
@font-face {
  font-family: 'bookmania';
  src: url('../assets/bookmania.otf') format('truetype');
}

.goals-txt {
  display: flex;
  align-content: flex-start;
  margin: auto;
  margin-top: 5px;
  margin-left: 30px;
  font-family: 'bookmania';
}

.total-read {
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  margin: auto;
  margin-left: 30px;
  margin-top: -12px;
  font-family: 'bookmania';
}

.search-bar {
  display: flex;
  height: 20px;
  margin-top: 3px;
  margin-left: 30px;
  padding-top: 6px;
}

.search-bar input {
  padding: 8px;
  margin-right: 10px;
  width: 150px;
  height: 45%;
  border-radius: 5px;
  font-family: 'bookmania';
}

.search-bar button {
  padding: 8px 16px;
  align-self: center;
  background-image: linear-gradient(#A8CA98, #5D8264);
  color: beige;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 25px;
  margin-top: 6px;
  line-height: 10px;
  font-family: 'bookmania';
}

.search-bar button:hover {
  color: #415b46;
}

.current-read-goal {
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  margin: auto;
  margin-left: 30px;
  margin-top: 20px;
  font-family: 'bookmania';
}
</style>
