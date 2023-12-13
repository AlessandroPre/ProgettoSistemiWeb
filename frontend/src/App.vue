<template>
  <header>
    <h1>Noleggio film</h1>
  </header>
  <nav>
      <ul><router-link to="/">Noleggi</router-link></ul>
      <ul><router-link to="/film">Film</router-link></ul>
      <ul><router-link to="/registi">Registi</router-link></ul>
  </nav>
  <main>
    <router-view />
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