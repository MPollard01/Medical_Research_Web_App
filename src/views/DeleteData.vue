<template>
  <div class="wrapper">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="head">
          <h2 class="title">Delete Your Data</h2>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <div>
          <el-card shadow="hover" class="box-card">
            <template #header>
              <div class="card-header">
                <span class="card-title">Find your data</span>
              </div>
            </template>
            <div>
              <el-form ref="form" label-width="180px">
                <el-form-item label="Cardiomyopathy Type">
                  <el-select
                    v-model="cardioType"
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    placeholder="select or type own"
                  >
                    <el-option
                      v-for="item in cardioTypes"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                  <el-button type="primary" @click="findDataByCardio"
                    >Find</el-button
                  >
                </el-form-item>
                <el-form-item label="Gene Name">
                  <el-select
                    v-model="geneName"
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    placeholder="select or type name"
                  >
                    <el-option
                      v-for="item in geneNames"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                  <el-button type="primary" @click="findDataByGene"
                    >Find</el-button
                  >
                </el-form-item>
                <el-form-item label="Study Title">
                  <el-select
                    v-model="title"
                    filterable
                    clearable
                    allow-create
                    default-first-option
                    placeholder="select or type title"
                  >
                    <el-option
                      v-for="item in studyTitles"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                  <el-button type="primary" @click="findDataByTitle"
                    >Find</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-card>
          <el-card shadow="hover" class="box-card">
            <h2>Results</h2>
            <DataResult
              class="result"
              v-for="data in results"
              :key="data.id"
              :data="data"
              @delete-data="deleteData"
            />
            <p v-if="!results.length">
              No results found, please refine your search.
            </p>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
import { firebaseFireStore } from "@/firebase/database";
import moment from "moment";

import DataResult from "@/components/DataResult";

import cardioTypes from "@/assets/cardioTypes";
import geneNames from "@/assets/geneNames";
import studyTitles from "@/assets/studyTitles";

export default {
  name: "DeleteData",
  components: {
    DataResult,
  },
  setup() {
    const user = ref(null);
    const cardioType = ref("");
    const geneName = ref("");
    const title = ref("");
    const results = ref([]);

    function findDataByCardio() {
      findData("cardioType", cardioType.value);
    }

    function findDataByGene() {
      findData("geneName", geneName.value);
    }

    function findDataByTitle() {
      findData("title", title.value);
    }

    function findData(whereColumn, query) {
      firebaseFireStore
        .collection("users")
        .doc(user.value.uid)
        .collection("cardioData")
        .where(whereColumn, "==", query)
        .onSnapshot((snapShot) => {
          results.value = [];
          snapShot.forEach((doc) => {
            console.log(doc.id + ": ");
            console.log(doc.data());
            var data = doc.data();
            data.id = doc.id;
            data.createdAt = data.createdAt.toDate();
            results.value.push(data);
          });
        });
    }

    function deleteData(documentId) {
      firebaseFireStore
        .collection("users")
        .doc(user.value.uid)
        .collection("cardioData")
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            if (doc.id === documentId) {
              if (
                confirm(
                  "Are you sure you want to delete record with the id: " +
                    doc.id +
                    " ?"
                )
              ) {
                console.log("Deleting...");
                doc.ref
                  .delete()
                  .then(() => {
                    const timestamp = moment().format("h:mma, Do MMMM YYYY");
                    const message =
                      "Record: " +
                      doc.id +
                      " was successfully deleted at " +
                      timestamp +
                      "!";
                    console.log(message);
                    alert(message);
                  })
                  .catch((error) => {
                    console.error("Error removing document: ", error);
                    alert(
                      "An error occured deleting this record, please try again."
                    );
                  });
              } else {
                console.log("User cancelled deletion.");
              }
            }
          });
        });
    }

    return {
      user,
      cardioTypes,
      geneNames,
      studyTitles,
      cardioType,
      geneName,
      title,
      results,
      findDataByCardio,
      findDataByGene,
      findDataByTitle,
      findData,
      deleteData,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin: 20px 100px;
  margin-bottom: 100px;
}
.title {
  text-align: left;
  margin-right: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.head {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.card-header {
  text-align: left;
  font-weight: bold;
}
p {
  text-align: left;
}
.el-select {
  width: 50%;
}
.result {
  margin: 10px;
}
</style>
