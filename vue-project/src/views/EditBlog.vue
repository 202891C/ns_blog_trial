<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import $ from 'jquery'
// import componentKey from '../App.vue'
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
};
var eventId = 0;
const blogData = ref(null)
// var urlParams = new URLSearchParams(window.location.search);
// eventId = urlParams.get('id');

const url = window.location.href;
const lastParam = url.split("/").slice(-1)[0];

var formSubmitted = ref(false);

onMounted(() => {
  fetch("http://localhost:3000/blog", {
    method: 'GET',
  })
    .then(async res => {
      if (res.status != 200) {
        console.log('Error loading blogs');
      }
      else {
        const data = await res.json();
        blogData.value = data;
        var idTag = []
        for (var i = 0; i < data.length; i++) {
          idTag.push(data[i].Id)
        }
        if (idTag.includes(parseInt(lastParam))) {
          console.log("included")
        }
        else {
          console.log("excluded")
          window.location.replace('/error');
        }

      }
    })
})

onUpdated(() => {
  window.location.reload();
})


function editForm(editEvent) {
  var blog = {
    title: editEvent.target.elements.title.value,
    description: editEvent.target.elements.description.value,
    user: editEvent.target.elements.user.value,
    userid: editEvent.target.elements.userid.value,
    id: editEvent.target.elements.id.value,
  }

  fetch("http://localhost:3000/editBlog", {
    method: 'POST',
    body: JSON.stringify({
      Title: blog.title,
      Description: blog.description,
      User: blog.user,
      Userid: blog.userid,
      Id: blog.id
    }) // convert JSON object to string
  })
    .then(res => {
      if (res.status != 200 && res.affectedRows != 0) {
        alert('Error updating blog');
      }
      else {
        console.log(res)
        alert('Blog updated!')
        //   forceRerender();
        window.location.reload();
        formSubmitted = true;
      }
    })
}

</script>
<template>
  <header>
    <form @submit.prevent="editForm" :key="componentKey">
      <h1>
        <u>Edit Blog </u>
      </h1>
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

      <input type="hidden" name="id" :value="lastParam">
      <button class="submit" type="submit">Update blog</button>
      <br>
      <RouterLink to="/">Return to Blogs</RouterLink>
    </form>

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
  background-color: lightgoldenrodyellow;
  margin-left: 10px;
  border-radius: 25px;
  border-color: purple;
}
.submit{
  border-radius: 25px;
}
</style> 

<!--@media (min-width: 1024px) {
    header {
        padding-left: calc(var(--section-gap) / 3);
        justify-content: center;
        padding-top: 0;
    }
}  -->
  