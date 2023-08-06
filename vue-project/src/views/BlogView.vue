<script setup>
import { onMounted, ref, onUpdated } from 'vue';
import $ from 'jquery'

// import {componentKey} from '../App.vue'

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
  console.log(componentKey.value + ' in App.vue')
};

var formSubmitted = ref(false);

function submitForm(submitEvent) {
      var blog = {
        title: submitEvent.target.elements.title.value,
        description: submitEvent.target.elements.description.value,
        user: submitEvent.target.elements.user.value,
        userid: submitEvent.target.elements.userid.value,
      }
  fetch("http://localhost:3000/createBlog", {
        method: 'POST',
        body: JSON.stringify({
          Title: blog.title,
          Description: blog.description,
          User: blog.user,
          Userid: blog.userid
        }) // convert JSON object to string
      })
      .then(res => {
        if (res.status != 200){
          console.log('Error creating blog');
          // console.log(blog.title + ' ' + blog.description + ' ' + blog.user + ' ' + blog.userid)
        }
        else{
          console.log('Blog created!')
          // forceRerender();
          window.location.reload();
          formSubmitted = true;
          // console.log(res)
        }
      })
}


</script>
<template>
  <header>
    <form @submit.prevent="submitForm" :key="componentKey"> 
      <h1>Create Blog</h1>
      <!-- v-if="!formSubmitted"  (to hide form when form has been submitted) -->
      <label for="name">Blog Title: </label>
      <input type="text" id="title" name="title" >
      <br>
      <label for="description">Blog Description: </label>
      <input type="text" id="description" name="description">
      <br>
      <label for="user">User: </label>
      <input type="text" id="user" name="user" > <br>
      <label for="userid">User Id: </label>
      <input type="text" id="userid" name="userid" >
      <br>
      <button class="submit" type="submit">Save blog</button>
    </form>
    <div v-if="formSubmitted" :key="componentKey">
      <h3>Blog Submitted</h3>
    </div>
  
</header> 

  
  
</template>
  
<style>
th, td{
  padding: 10px;
}

tr:nth-child(even) {
  background-color: cadetblue;
  color: white;
 }

 th {
  background-color: lightblue;
 }
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} 
</style>
