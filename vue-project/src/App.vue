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

</script>

<template>
  <div class="tableDiv">
    <table>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Writer</th>
        <th>Date Written</th>
        <th colspan="2"> Actions </th>
      </tr>
      <tr :key="[componentKey].toString()" v-for="(value, key) in blogData">
        <td>{{ value.Title }}</td>
        <td> {{ value.Description }}</td>
        <td>{{ value.User }}</td>
        <td>{{ Date(value.Date).slice(0, 15) }}</td>
        <td>
          <RouterLink :to="{ name: 'edit', params: { id: value.Id } }"><span class="material-icons">
            mode_edit
            </span></RouterLink>
        </td>
        <td @click="deleteBlog(value.Id)" class="deleteBtn"><span class="material-icons">
          delete
          </span></td>
      </tr>
    </table>
  </div>
  <RouterView :key="componentKey" />
</template>


<style scoped>
.material-icons {
  color: black;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

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

 .tableDiv {
  display: flex;
  justify-content: center;
 }

</style> 
