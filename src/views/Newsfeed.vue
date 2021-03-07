<template>
    <div class="wrap">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="head">
                    <h2 class="title">Newsfeed</h2>
                </div>
            </el-col>
        </el-row>
        <div class="feed-wrapper">
            <iframe width="600" height="600" src="https://rss.app/embed/v1/fjWlXHcWyEcKJQmV" frameBorder="0"></iframe>
        </div>
    </div>
</template>

<script>

export default {
  name: "Newsfeed",
  setup() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .feed-wrapper {
        display: flex;
        justify-content: center;
        margin-top: -4rem;
    }
</style>
