<template>

  <div class="site-background">

    <NavBar />
    <div class="library-txt">
      <h2>Your Library</h2>
    </div>

    <div class="want-to-read">
      <h3>Want to Read</h3>
    </div>

    <div v-if="wantToReadBooks.length > 0" class="wantto-container">
      <div class="book-container">
        <div v-for="(book, index) in    wantToReadBooks   " :key="index" class="book-item">
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
                <button @click="currentRead(book)" class="dropdown-button">
                  {{ book.isAddedCur ? '✔' : 'Currently Reading ' }}</button>
                <button @click="Read(book)" class="dropdown-button">{{ book.isAddedRead ? '✔' : 'Read'
                  }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-txt">
      <p>Your Want to Read library is currently empty.</p>
    </div>


    <div class="currently-reading">
      <h3>Currently Reading</h3>
    </div>

    <div v-if="currentRead.length > 0" class="wantto-container">
      <div class="book-container">
        <div v-for="(book, index) in    currentRead   " :key="index" class="book-item">
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
                <button @click="currentRead(book)" class="dropdown-button">
                  {{ book.isAddedCur ? '✔' : 'Currently Reading ' }}</button>
                <button @click="Read(book)" class="dropdown-button">{{ book.isAddedRead ? '✔' : 'Read'
                  }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-txt">
      <p>Your Currently Reading library is currently empty.</p>
    </div>

    <div class="read">
      <h3>Read</h3>
    </div>

    <div v-if="Read.length > 0" class="wantto-container">
      <div class="book-container">
        <div v-for="(book, index) in    Read   " :key="index" class="book-item">
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
                <button @click="currentRead(book)" class="dropdown-button">
                  {{ book.isAddedCur ? '✔' : 'Currently Reading ' }}</button>
                <button @click="Read(book)" class="dropdown-button">{{ book.isAddedRead ? '✔' : 'Read'
                  }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-txt">
      <p>Your Read library is currently empty.</p>
    </div>

  </div>
</template>


<script scoped>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'LibraryView',
  components: {
    NavBar
  },

  methods: {

  },

  mounted() {
    let books = localStorage.getItem("books")
    books = JSON.parse(books)
    this.wantToReadBooks = books

    let booksCur = localStorage.getItem("booksCur")
    booksCur = JSON.parse(booksCur)
    this.currentRead = booksCur

    let booksRead = localStorage.getItem("booksRead")
    booksRead = JSON.parse(booksRead)
    this.Read = booksRead
  },

  data() {
    return {
      wantToReadBooks: [],
      currentRead: [],
      Read: []
    };
  },
}

</script>


<style scoped>
@font-face {
  font-family: 'Bookmania-Regular';
  src: url('../assets/Bookmania-Regular.otf') format('truetype');
}

.library-txt {
  display: flex;
  align-content: flex-start;
  margin: auto;
  margin-top: 5px;
  margin-left: 30px;
  font-family: 'Bookmania-Regular';
}

.want-to-read {
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  margin: auto;
  margin-left: 30px;
  margin-top: -12px;
  font-family: 'Bookmania-Regular';
}

.wantto-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
  margin-top: -5px;
  background-color: #c6c6b2;
  border-radius: 20px;
  max-width: fit-content;
}

.currently-reading {
  display: flex;
  align-content: flex-start;
  margin: auto;
  margin-left: 30px;
  font-family: 'Bookmania-Regular';
}

.current-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
  margin-top: -5px;
  background-color: #c6c6b2;
  border-radius: 20px;
  max-width: fit-content;
}

.read {
  display: flex;
  align-content: flex-start;
  margin: auto;
  margin-left: 30px;
  font-family: 'Bookmania-Regular';
}

.read-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
  margin-top: -5px;
  background-color: #c6c6b2;
  border-radius: 20px;
  max-width: fit-content;
}

.book-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
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

.empty-txt {
  font-family: 'Bookmania-Regular';
  font-size: 15px;
  margin-left: 30px;
}
</style>