<template>
  <div class="home-page">
    <div class="home-wrapper">
        <h1>Welcome...</h1>
        <p class="mg-none">to the Cariomyopathy Platform, a central database for all queries</p>
        <p class="mg-none">relating to Cariomyopathy research.</p>
        <p class="mg-top-4rem">Please choose an option below to continue:</p>
        <router-link to="/login" tag="button" class="button">Sign in</router-link>
        <router-link to="/register" tag="button" class="button invert">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-page {
    display: flex;
    justify-content: center;
    text-align: center;
}

.home-wrapper {
    width: 600px;
    margin-top: 150px;
}

.mg-none {
    margin: 0;
}

.mg-top-4rem {
    margin-top: 4rem;
}

p {
    font-size: 18px;
}

.button {
    width: 150px;
    height: 35px;
    margin-bottom: 1rem;
    border-radius: 15px;
    background-color: #c28adb;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
}

.invert {
    background-color: white;
    color: #c28adb;
    border: 2px solid #c28adb;
}

.button:hover {
    cursor: pointer;
}

</style>
