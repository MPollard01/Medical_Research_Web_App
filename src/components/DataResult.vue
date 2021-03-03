<template>
  <div class="wrapper">
    <el-card shadow="hover" class="box-card">
      <div class="content">
        <div class="section">
          <p class="heading">ID:</p>
          {{ data.id }}<br />
          <p class="heading">Cardiomyopath Type:</p>
          {{ data.cardioType }}<br />
          <p class="heading">Gene Name:</p>
          {{ data.geneName }}<br />
        </div>
        <div class="section">
          <p class="heading">Study Title:</p>
          {{ data.title }}<br />
          <p class="heading">Notes:</p>
          {{ data.notes }}<br />
          <p class="heading">Created at:</p>
          {{ getFormattedDate(data.createdAt) }}<br />
          <br />
        </div>
      </div>
      <el-button class="button" type="danger" @click="deleteData(data.id)"
        >Delete</el-button
      >
    </el-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "DataResult",
  props: {
    data: {
      type: Object,
    },
  },
  emits: ["delete-data"],
  setup(props, context) {
    function getFormattedDate(date) {
      return moment(date).format("Do MMMM YYYY, h:mm a");
    }

    function deleteData(id) {
      context.emit("delete-data", id);
    }

    return { getFormattedDate, deleteData };
  },
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
  display: flex;
  text-align: left;
}

.heading {
  font-weight: bold;
}

.section {
  width: 40%;
}

.button {
  width: 20%;
}
</style>
