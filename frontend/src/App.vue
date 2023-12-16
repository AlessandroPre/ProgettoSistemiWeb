<template>
  <header>
    <h1>Noleggio film</h1>
  </header>
  <nav>
    <router-link to="/main/film">Film</router-link>
    <router-link to="/main/noleggio">Noleggio</router-link>
  </nav>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <p>Progetto di Proietti Martina e Alessandro Pretolani</p>
  </footer>
</template>

<style scoped>
.router-link-exact-active {
  color: rgb(219, 69, 83);
  background-color: #fff;
}
</style>
