<template>
  <div class="dashboard-page">
    <div class="dashboard-wrapper">
        <h1>Dashboard</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard-page {
    display: flex;
    justify-content: center;
    text-align: center;
}

.dashboard-wrapper {
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
