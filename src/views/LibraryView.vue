<template>

  <div class="site-background">

    <NavBar />
    <div class="library-txt">
      <h2>Your Library</h2>
    </div>

    <div class="want-to-read">
      <h3>Want to Read</h3>
    </div>

    <div class="wantto-container">
      <div class="book-container">
        <div v-for="(book, index) in    wantToReadBooks   " :key="index" class="book-item">
          <img v-if="book.cover_i !== undefined" :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'"
            alt="Book Cover" style="max-width: 100px;">
          <img v-else src="\src\assets\NoCoverAvailable1.png" alt="Default Cover" style="max-width: 125px;">
          {{ book.title }} by {{ book.author_name }}

          <button @click="wantToRead(book)" class="want-content">Want to Read</button>
          <div class="dropdown">
            <button class="dropbtn">▼</button>
            <div class="dropdown-content">
              <a href="">Want to Read</a>
              <a href="">Currently Reading</a>
              <a href="">Read</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="currently-reading">
      <h3>Currently Reading</h3>
    </div>

    <div class="current-container">
      <h1>hello</h1>
    </div>

    <div class="read">
      <h3>Read</h3>
    </div>

    <div class="read-container">
      <h1>hello</h1>
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

  }
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
  margin: auto;
  margin-left: 30px;
  margin-top: -12px;
  font-family: 'Bookmania-Regular';
}

.wantto-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin: 10px;
  margin-top: -5px;
  background-color: #DCDCC6;
  border-radius: 20px;
  padding: 20px;
  width: 150px;
  height: auto;
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
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin: 10px;
  margin-top: -5px;
  background-color: #DCDCC6;
  border-radius: 20px;
  padding: 20px;
  width: 150px;
  height: auto;
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
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin: 10px;
  margin-top: -5px;
  background-color: #DCDCC6;
  border-radius: 20px;
  padding: 20px;
  width: 150px;
  height: auto;
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
</style>