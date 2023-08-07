<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRoute, useRouter } from 'vue-router';

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
  console.log(componentKey.value)
}; // to reload page before I used window.location.reload

// var data = [];
const blogData = ref(null)

onMounted(() => {
  fetch("http://localhost:3000/blog", {
    method: 'GET',
  })
    .then(async res => {
      if (res.status != 200) {
        console.log('Error loading blogs');
      }
      else {
        console.log('Blogs found!')
        // console.log(res.json())
        // CANNOT USE res.json() more than once per section
        const data = await res.json()
        blogData.value = data;
        // console.log(data)
        // forceRerender()
        // window.location.reload(); DO NOT USE this here. It will continually refresh the page
      }
    })
})

function deleteBlog(id) {
  fetch("http://localhost:3000/deleteBlog/" + id, {
    method: 'DELETE'
  })
    .then(res => {
      if (res.status != 200) {
        alert('Error deleting blogs');
      }
      else {
        alert('Deleted Blog');
        window.location.reload();
      }
    })
}

// Removed login codes due to time constraints
// function loginForm(loginEvent) {
//       var credentials = {
//         user: loginEvent.target.elements.user.value,
//         present: loginEvent.target.elements.present.value,
//       }
//   fetch("http://localhost:3000/users/present", {
//         method: 'POST',
//         body: JSON.stringify({
//           User: credentials.user,
//           Present: credentials.present
//         }) // convert JSON object to string
//       })
//       .then(res => {
//         if (res.status != 200 && res != null){
//           console.log('Incorrect password');
//           // console.log(blog.title + ' ' + blog.description + ' ' + blog.user + ' ' + blog.userid)
//         }
//         else{
//           console.log('Logged in!')

//           router.push(

//           )
//         }
//       })
// }

</script>

<template>
  <div>
    <h1>Blog Page</h1>
    <table border="1">
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Writer</th>
        <th>Date Written</th>
        <th colspan="2"> Edit Blogs </th>
      </tr>
      <tr :key="[componentKey].toString()" v-for="(value, key) in blogData">
        <td>{{ value.Title }}</td>
        <td> {{ value.Description }}</td>
        <td>{{ value.User }}</td>
        <td>{{ Date(value.Date).slice(0, 15) }}</td>
        <td>
          <RouterLink :to="{ name: 'edit', params: { id: value.Id } }">Edit</RouterLink>
        </td>
        <td @click="deleteBlog(value.Id)">Delete</td>
      </tr>
    </table>
  </div>
  <RouterView :key="componentKey" />
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    justify-content: center;
  }

}
</style> 
