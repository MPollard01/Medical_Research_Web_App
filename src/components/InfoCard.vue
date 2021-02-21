<template>
  <div class="wrapper">
    <el-card shadow="hover" class="box-card">
        <template #header>
            <div class="card-header">
                <h3 class="card-title">{{name}}</h3>
            </div>
        </template>
        <div class="content">
            <h4>Clinical synopsis</h4>
            <el-collapse v-model="activeNames" @change="handleChange" v-for="(term, x) in terms" :key="x">
                <el-collapse-item name="1" >
                    <template v-slot:title>
                        {{term["name"]}}
                    </template>
                    <div>{{term["definition"] ? term["definition"] : "No Definition"}}</div>
                </el-collapse-item>
            </el-collapse>
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

.box-card {
    width: 100%;
}

.content {
    text-align: left;
}
</style>
