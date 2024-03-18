<template>
    <div class="site-background">
        <div class="title">
          <img src="/src/assets/Leaves.png" style ="transform:scaleX(-1);">
          <h1>My Little Library</h1>
          <img src="/src/assets/Leaves.png">
        </div>
    
        <b-navbar class="link-background link-style">
          <router-link class ="nav-link" to ="/" >Home</router-link>
          <router-link class = "nav-link" to = "/LibraryView" >Library</router-link>
          <router-link class = "nav-link" to = "/BrowseView">Browse</router-link>
          <router-link class = "nav-link" to = "/GoalsView">Goals</router-link>
        

        <div class = "search-bar">
            <input type="text" v-model="searchQuery" placeholder="Searching Books..." @keyup.enter="search">
            <button @click ="search">Search</button>
          </div>
        </b-navbar>

            <div v-if ="searchResults.length > 0" class ="search-results results-txt">
          <h2>Search Results</h2>
            </div> 

          <ul>
            <li v-for= "(book,index) in searchResults" :key="index">
            {{ book.title }} 
          </li>
          </ul>

        <div v-if="searchError" class="error-message results-txt">
        {{ searchError }}
        </div>
       
    
      </div>
    </template>
    
    
    <script scoped>
    import axios from 'axios';

    export default {
        name: 'BrowseView',
        data() {
            return {
                searchQuery: '',
                searchResults: [],
                searchError: ''
            };
        },
        mounted() {
        },

        methods: {
            async search() {
              try {
                const respnose = await axios.get("https://openlibrary.org/search.json?", {
                  params:{
                    q:this.searchQuery
                  }
                });
            this.searchResults = respnose.data.docs;
              } catch (error) {
                console.error('Error Searching Books:', error);
                this.searchError = 'An error occurred while searching books.';
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
    
    .title{
      display: flex;
      text-align: center;
      font-size: large;
      flex-direction: row; 
      justify-content: center; 
    }

    .title > h1 {
      width: 20vw;
    }

    .title > img {
      width: 40vw;
    }
    
    .link-background {
        background-image:linear-gradient(#A8CA98,#5D8264);
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
      }

      .nav-link {
        color:beige;
        text-decoration: none;
        transition: color 0.3s;
      }

      .nav-link:hover {
        color: black;
      }

      .search-bar {
        display: flex;
        height: 20px;
        margin-top: 3px;
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
          margin-top: 10px;
          margin-left: 30px;
        }

    </style>