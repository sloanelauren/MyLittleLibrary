<template>

  <div class="site-background">

    <NavBar />
    <div class="welcome-txt">
      <p>Welcome to My Little Library</p>
      <img src="/src/assets/mylittlelibrarylogo1.png" style="height: 50px; height: 50px;">
    </div>

    <div v-if="loading" class="loading-img">
      <img src="@/assets/Loadingscr.gif" alt="Loading..." class="loading-gif">
    </div>

    <div v-if="bestSellers.length > 0" class="best-sellers results-txt">
      <h2>Best Sellers</h2>
    </div>

    <div class="book-container">
      <div v-for="(book, index) in bestSellers" :key="index" class="book-item">
        <img v-if="book.cover_i !== undefined" :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'"
          alt="Book Cover" style="max-width: 100px;">
        <img v-else src="NoCoverAvailableImage" alt="Default Cover" style="max-width: 125px;">
        {{ book.title }} by {{ book.author_name }}

        <div>
          <button @click="wantToRead(book)" class="want-content">{{ book.isAdded ? '✔' : 'Want to Read'
            }}</button>
          <div class="dropdown">
            <button class="dropbtn">▼</button>
            <div class="dropdown-content">
              <button @click="wantToRead(book)" class="dropdown-button">{{ book.isAdded ? '✔' : 'Want to Read'
                }}</button>
              <button @click="currentRead(book)" class="dropdown-button">{{ book.isAddedCur ? '✔' : 'Currently Reading'
                }}</button>
              <button @click="Read(book)" class="dropdown-button">{{ book.isAddedRead ? '✔' : 'Read'
                }}</button>
            </div>
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
import NoCoverAvailableImage from '@/assets/NoCoverAvailable1.png';


export default {
  name: 'HomeView',
  components: {
    NavBar
  },

  data() {
    return {
      bestSellers: [],
      searchError: '',
      loading: false,
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
          book.isAdded = false;
          book.isAddedCur = false;
          book.isAddedRead = false;
        });

        this.bestSellers = randomBestSellers;
      } catch (error) {
        console.error('Error fetching best sellers:', error);
        this.searchError = 'An error occurred while fetching best sellers.';
      } finally {
        this.loading = false;
      }
    },

    wantToRead(book) {
      book.isAdded = !book.isAdded;
      let books = localStorage.getItem("books");
      if (books != undefined) {
        books = JSON.parse(books);
      } else {
        books = []
      }
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    },

    currentRead(book) {
      book.isAddedCur = !book.isAddedCur;
      let booksCur = localStorage.getItem("booksCur");
      if (booksCur != undefined) {
        booksCur = JSON.parse(booksCur);
      } else {
        booksCur = []
      }
      booksCur.push(book);
      localStorage.setItem("booksCur", JSON.stringify(booksCur));
    },

    Read(book) {
      book.isAddedRead = !book.isAddedRead;
      let booksRead = localStorage.getItem("booksRead");
      if (booksRead != undefined) {
        booksRead = JSON.parse(booksRead);
      } else {
        booksRead = []
      }
      booksRead.push(book);
      book.timestamp = new Date().toLocaleString();
      localStorage.setItem("booksRead", JSON.stringify(booksRead));

      const startTimestamp = localStorage.getItem("starttimestamp");
      if (startTimestamp && new Date(book.timestamp) > new Date(startTimestamp)) {
        let bookCounter = localStorage.getItem("bookCounter");
        bookCounter = bookCounter ? parseInt(bookCounter) + 1 : 1;
        localStorage.setItem("bookCounter", bookCounter.toString());
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
  font-family: 'bookmania';
  src: url('../assets/bookmania.otf') format('truetype');
}

.welcome-txt {
  font-size: 30px;
  text-align: center;
  font-family: "Blueberry";
  color: #415b46;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 5px;
}

.results-txt {
  display: flex;
  align-content: flex-start;
  margin: auto;
  margin-top: 5px;
  margin-left: 30px;
  padding-top: -15px;
  font-family: 'bookmania';
  margin-top: -15px;
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
  font-family: 'bookmania';
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
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  font-family: 'bookmania';
  font-size: 12px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 5px;
  font-size: 12px;
  width: max-content;
  line-height: 0.1;
}

.dropdown-content a {
  color: beige;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-family: 'bookmania';
}

.dropdown-content a:hover {
  color: #415b46;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #415b46;
}

.want-content {
  background-image: linear-gradient(#A8CA98, #5D8264);
  padding: 7px;
  border: none;
  color: beige;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-family: 'bookmania';
  width: 102px;
  font-size: 12px;
}

.want-content:hover {
  color: #415b46;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-image: linear-gradient(#A8CA98, #5D8264);
  border-radius: 5px;
  font-size: 12px;
  width: max-content;
  line-height: 0.1;
}

.dropdown-content button {
  color: beige;
  padding: 5px 5px;
  text-decoration: none;
  display: block;
  font-family: 'bookmania';
  background: none;
  border: none;
  border-radius: 5px;
  width: 128px;
  text-align: left;
  text-align: center;
  font-size: 12px;
}

.dropdown-content button:hover {
  color: #415b46;
}

.dropdown-content button:focus {
  outline: none;
}
</style>