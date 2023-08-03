<script setup>
import { ref, onMounted, onBeforeMount} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import $ from "jquery";

defineProps({
  title: "",
  description: "",
  user: "",
  userid: "",
  formSubmitted: false
})

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
        }
      })
}

</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
    <form @submit.prevent="submitForm">
      <!-- v-if="!formSubmitted"  (to hide form when form has been submitted) -->
      <label for="name">Blog Title: </label>
      <input type="text" id="title" name="title" >
      <!-- v-model="title" -->
      <br>
      <label for="description">Blog Description: </label>
      <input type="text" id="description" name="description">
      <br>
      <label for="user">User: </label>
      <input type="text" id="user" name="user" >
      <label for="userid">User Id: </label>
      <input type="text" id="userid" name="userid" >
      <br>
      <button class="submit" type="submit">Save blog</button>
    </form>
    <div v-if="formSubmitted">
      <h3>Blog Submitted</h3>
      <p>title: {{ title }}</p>
      <p>description: {{ description }}</p>
      <p>User: {{ user }}</p>
      <small>Click on run to launch the app again.</small>
    </div>
  </header>


  <!-- <RouterView /> -->
</template>

<!-- 
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
