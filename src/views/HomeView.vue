<template>

<div class="site-background">
    
    <NavBar/>
    <div class = "welcome-txt">
      <p>Welcome to My Little Library</p>
    </div>
    
    <div v-if = "loading" class = "loading-img">
      <img src = "\src\assets\Loadingscr.gif" alt = "Loading..." class = "loading-gif"> 
    </div>

    <div v-if = "bestSellers.length > 0" class = "best-sellers results-txt">
      <h2>Best Sellers</h2>
    </div>

  <div class = "book-container">
    <div v-for="(book, index) in bestSellers" :key="index" class = "book-item">
          <img v-if="book.cover_i" :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'" alt="Book Cover" style="max-width: 100px;">
          {{ book.title }} by {{ book.author_name }}
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

.welcome-txt {
  font-size: 30px;
  text-align: center;
}

.results-txt {
          display: flex;
          align-content: flex-start;
          margin: auto;
          margin-top: 5px;
          margin-left: 30px;
          padding-top: -15px;;
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
          display:flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          padding-left: 10px;
          padding-bottom: 25px;    
          
        }

        .book-item {
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


</style>