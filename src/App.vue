<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
*{
  margin: 0;
  padding: 0;
}
body{
  font-family: 'Roboto', sans-serif;
  user-select: none;
}
html{
  background-image: url('./assets/hub.jpg');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  background-attachment: fixed;
}
</style>
