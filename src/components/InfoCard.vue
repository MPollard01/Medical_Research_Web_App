<template>
  <div class="wrapper">
    <el-card shadow="hover" class="box-card">
        <template #header>
            <div class="card-header">
                <h3 class="card-title">{{name}}</h3>
            </div>
        </template>
        <div class="content">
            <div v-for="(term, x) in terms" :key="x">
                <h3>{{term["name"]}}</h3>
                <p>{{term["definition"]}}</p>
            </div>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    terms: {
        type: Object
    },
    name: {
        type: String
    }
  },
  data() {
    return {}
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  margin-top: 1rem;
  
}

.content {
    text-align: left;
}
</style>
