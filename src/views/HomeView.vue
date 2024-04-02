<template>

  <div class="site-background">

    <NavBar />
    <div class="welcome-txt">
      <p>Welcome to My Little Library</p>
    </div>

    <div v-if="loading" class="loading-img">
      <img src="\src\assets\Loadingscr.gif" alt="Loading..." class="loading-gif">
    </div>

    <div v-if="bestSellers.length > 0" class="best-sellers results-txt">
      <h2>Best Sellers</h2>
    </div>

    <div class="book-container">
      <div v-for="(book, index) in bestSellers" :key="index" class="book-item">
        <img v-if="book.cover_i" :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'"
          alt="Book Cover" style="max-width: 100px;">
        {{ book.title }} by {{ book.author_name }}

        <div class="dropdown">
          <button @click="" class="want-content">Want to Read</button>
          <button class="dropbtn">▼</button>
          <div class="dropdown-content">
            <a href="">Want to Read</a>
            <a href="">Currently Reading</a>
            <a href="">Read</a>
          </div>
        </div>
      </div>

      <div v-if="searchError" class="error-message results-txt">
        {{ searchError }}
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from '../components/NavBar.vue'
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    NavBar
  },

  data() {
    return {
      bestSellers: [],
      searchError: '',
      loading: false
    };
  },

  mounted() {
    this.fetchBestSellers();
  },

  methods: {
    async fetchBestSellers() {
      this.loading = true;
      try {
        const categories = ['fiction', 'nonfiction', 'mystery', 'romance'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];

        const response = await axios.get("https://openlibrary.org/search.json", {
          params: {
            q: `popular ${randomCategory}`,
            limit: 50,
            fields: 'key,title,author_name,cover_i'
          }
        });

        const shuffledBestSellers = this.shuffle(response.data.docs);

        const randomBestSellers = shuffledBestSellers.slice(0, 14);

        randomBestSellers.forEach(book => {
          if (Array.isArray(book.author_name)) {
            book.author_name = book.author_name.join(', ');
          }
        });

        this.bestSellers = randomBestSellers;
      } catch (error) {
        console.error('Error fetching best sellers:', error);
        this.searchError = 'An error occurred while fetching best sellers.';
      } finally {
        this.loading = false;
      }
    },

    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
}

</script>


<style scoped>
@font-face {
  font-family: 'Bookmania-Regular';
  src: url('../assets/Bookmania-Regular.otf') format('truetype');
}

.welcome-txt {
  font-size: 30px;
  text-align: center;
  font-family: "Blueberry";
  color: #415b46;
}

.results-txt {
  display: flex;
  align-content: flex-start;
  margin: auto;
  margin-top: 5px;
  margin-left: 30px;
  padding-top: -15px;
  font-family: 'Bookmania-Regular';
}

.loading-img {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.loading-gif {
  max-width: 120px;
}

.book-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 10px;
  padding-bottom: 25px;
  font-family: 'Bookmania-Regular';
}

.book-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin: 10px;
  background-color: #DCDCC6;
  border-radius: 20px;
  padding: 20px;
  width: 150px;
  height: auto;
}

.book-item img {
  display: block;
  margin: 0 auto 10px;
}

.dropbtn {
  background-image: linear-gradient(#A8CA98, #5D8264);
  padding: 7px;
  border: none;
  color: beige;
  border-radius: 5px;
  font-family: 'Bookmania-Regular';
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-image: linear-gradient(#A8CA98, #5D8264);
  min-width: 160px;
  border-radius: 5px;
  font-size: 12px;
}

.dropdown-content a {
  color: beige;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-family: 'Bookmania-Regular';
}

.dropdown-content a:hover {
  color: #415b46;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn .want-content {
  background-color: #415b46;
}

.want-content {
  background-image: linear-gradient(#A8CA98, #5D8264);
  padding: 7px;
  border: none;
  color: beige;
  border-radius: 5px;
  font-family: 'Bookmania-Regular';
}

.want-content:hover {
  background-color: #415b46;
}
</style>