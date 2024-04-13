<template>
  <div class="site-background">
    <NavBar />
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Searching Books..." @keyup.enter="search">
      <button @click="search">Search</button>
    </div>

    <div v-if="loading" class="loading-img">
      <img src="\src\assets\Loadingscr.gif" alt="Loading..." class="loading-gif">
    </div>

    <div v-if="searchResults.length > 0" class="search-results results-txt">
      <h2>Search Results</h2>
    </div>

    <div class="book-container">
      <div v-for="(book, index) in searchResults" :key="index" class="book-item">
        <img v-if="book.cover_i !== undefined" :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'"
          alt="Book Cover" style="max-width: 100px;">
        <img v-else src="\src\assets\NoCoverAvailable1.png" alt="Default Cover" style="max-width: 125px;">
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


<script scoped>
import NavBar from '../components/NavBar.vue';
import axios from 'axios';

export default {
  name: 'BrowseView',
  components: {
    NavBar
  },

  data() {
    return {
      searchQuery: '',
      searchResults: [],
      searchError: '',
      loading: false
    };
  },
  mounted() {
  },

  methods: {
    async search() {
      this.loading = true;
      this.searchResults = [];
      try {
        const response = await axios.get("https://openlibrary.org/search.json?", {
          params: {
            q: this.searchQuery,
            fields: 'key,title,author_name,cover_i'
          }
        });

        response.data.docs.forEach(book => {
          if (Array.isArray(book.author_name)) {
            book.author_name = book.author_name.join(', ');
          }
          book.isAdded = false;
          book.isAddedCur = false;
          book.isAddedRead = false;
        });

        this.searchResults = response.data.docs;
      } catch (error) {
        console.error('Error Searching Books:', error);
        this.searchError = 'An error occurred while searching books.';
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
      localStorage.setItem("booksRead", JSON.stringify(booksRead));
    },

    async wanttoread() {

    }
  }
}
</script>


<style scoped>
@font-face {
  font-family: 'Bookmania-Regular';
  src: url('../assets/Bookmania-Regular.otf') format('truetype');
}

.site-background {
  background-color: beige;
  min-height: 100vh;
  margin: -8px;
}

.search-bar {
  display: flex;
  height: 20px;
  margin-top: 3px;
  justify-content: center;
  padding-top: 6px;
}

.search-bar input {
  padding: 8px;
  margin-right: 10px;
  width: 300px;
  height: 45%;
  border-radius: 5px;
  font-family: 'Bookmania-Regular';
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
  font-family: 'Bookmania-Regular';
}

.search-bar button:hover {
  color: #415b46;
}

.results-txt {
  display: flex;
  align-content: flex-start;
  margin: auto;
  margin-top: 5px;
  margin-left: 30px;
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
  font-family: 'Bookmania-Regular';
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
  font-family: 'Bookmania-Regular';
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
  background-image: linear-gradient(#A8CA98, #5D8264);
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
  font-family: 'Bookmania-Regular';
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
  font-family: 'Bookmania-Regular';
  width: 102px;
  font-size: 12px;
}

.want-content:hover {
  color: #415b46;
}

.dropdown-content button {
  color: beige;
  padding: 5px 5px;
  text-decoration: none;
  display: block;
  font-family: 'Bookmania-Regular';
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