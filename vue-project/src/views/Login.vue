<script setup>


function loginForm(loginEvent) {
    var credentials = {
      user: loginEvent.target.elements.user.value,
      present: loginEvent.target.elements.present.value,
    }
fetch("http://localhost:3000/users/present", {
      method: 'POST',
      body: JSON.stringify({
        User: credentials.user,
        Present: credentials.present
      }) // convert JSON object to string
    })
    .then(res => {
      if (res.status != 200 && res != null){
        console.log('Incorrect password');
        // console.log(blog.title + ' ' + blog.description + ' ' + blog.user + ' ' + blog.userid)
      }
      else{
        console.log('Logged in!')
      }
    })
}

</script>

<template>
    <div class="login">
      <h1>This is a login page</h1>
      <br>
          <div>
  <form @submit.prevent="loginForm" v-show="!login">
      <label for="user">User: </label>
      <input type="text" id="user" name="user" > <br>
      <label for="present">Password: </label>
      <input type="text" id="present" name="present"> <br>
      <button class="submit" type="submit">Login</button>
  </form>
</div>
    </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .login {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>