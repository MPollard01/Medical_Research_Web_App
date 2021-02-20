<template>
  <div class="empty-wrapper">
      <el-card shadow="hover" class="box-card">
        <i class="el-icon-search"></i>
        <p>Please search for a gene to begin.</p>
      </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.empty-wrapper {
    margin-top: 1rem;
}
.el-icon-search {
    font-size: 50px;
}
</style>
