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
      if (res.status != 200) {
        console.log('Error creating blog');
        // console.log(blog.title + ' ' + blog.description + ' ' + blog.user + ' ' + blog.userid)
      }
      else {
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
  <header class="createHeader">
    <form @submit.prevent="submitForm" :key="componentKey">
      <h1>Create Blog</h1>
      <!-- v-if="!formSubmitted"  (to hide form when form has been submitted) -->
      <div class="editFields">
        <label for="name">Blog Title: </label>
        <input type="text" id="title" name="title">
      </div>
      <div class="editFields">
        <label for="description">Blog Description:  </label>
        <input type="text" id="description" name="description">
      </div>
      <div class="editFields">
        <label for="user">User: </label>
        <input type="text" id="user" name="user">
      </div>
      <div class="editFields">
        <label for="userid">User Id: </label>
        <input type="text" id="userid" name="userid">
      </div>
      <button class="submit" type="submit">Save blog</button>
    </form>
    <div v-if="formSubmitted" :key="componentKey">
      <h3>Blog Submitted</h3>
    </div>

  </header>
</template>
  
<style>
@media (min-width: 1024px) {
.editFields{
  display: flex;
  justify-content: space-between;
  padding-right: calc(var(--section-gap) / 2);
}
header{
  padding-top: 0px !important;
}
}
.editFields{
  display: flex;
  justify-content: space-between;
  padding-bottom: 2px;
}
header{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
input{
  border-color: purple;
  background-color: lightgoldenrodyellow;
  margin-left: 10px;
  border-radius: 25px;
}
.submit{
  border-radius: 25px;
}
</style>

<!-- @media (min-width: 1024px) {
  header {
    padding-right: calc(var(--section-gap) / 2);
  }

} header {
  line-height: 1.5;
  max-height: 100vh;
}
-->
