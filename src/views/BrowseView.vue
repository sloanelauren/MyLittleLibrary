<template>
    <div class = "site-background">
        <NavBar/>
        <div class = "search-bar">
            <input type="text" v-model="searchQuery" placeholder="Searching Books..." @keyup.enter="search">
            <button @click ="search">Search</button>
          </div>
        
          <div v-if = "loading" class = "loading-img">
            <img src = "\src\assets\Loadingscr.gif" alt = "Loading..." class = "loading-gif"> 
          </div>

            <div v-if ="searchResults.length > 0" class ="search-results results-txt">
          <h2>Search Results</h2>
            </div> 

            <div v-for= "(book,index) in searchResults" :key="index" class = "book-container">
              <img v-if = "book.cover_i" :src = "'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg'" alt ="Book Cover" style = "max-width: 100px;">
            {{ book.title }} by {{ book.author_name }}
            </div>

        <div v-if="searchError" class="error-message results-txt">
        {{ searchError }}
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
                  params:{
                    q:this.searchQuery
                  }
                });
            this.searchResults = response.data.docs;
              } catch (error) {
                console.error('Error Searching Books:', error);
                this.searchError = 'An error occurred while searching books.';
              } finally {
                this.loading = false;
              }
          }
        }
    }     
    </script>
    
    
    <style scoped>
    .site-background {
      background-color: beige;
      min-height: 100vh;
      margin:-8px;
    }

      .search-bar {
        display: flex;
        height: 20px;
        margin-top: 3px;
        justify-content: center;
        padding-top: 4px;
    }

        .search-bar input {
        padding: 8px;
        margin-right: 10px;
        width: 300px;
        height: 45%;
        border-radius: 5px;
    }

        .search-bar button {      
        padding: 8px 16px;
        align-self: center;
        background-image:linear-gradient(#A8CA98,#5D8264);
        color: beige;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        height: 25px;
        margin-top: 6px;
        line-height: 10px;
      }

        .search-bar button:hover {
        color: black;
        }

        .results-txt {
          display: flex;
          align-content: flex-start;
          margin: auto;
          margin-top: 5px;
          margin-left: 30px;
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
          padding-left: 10px;
          padding-bottom: 25px; 
        }

    </style>