<template>
  <div class="wrap">
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
                    id="CardioType"
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
                  <el-button
                    type="primary"
                    @click="findData('cardioType', cardioType)"
                    >Find</el-button
                  >
                </el-form-item>
                <el-form-item label="Gene Name">
                  <el-select
                    id="GeneName"
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
                  <el-button
                    type="primary"
                    @click="findData('geneName', geneName)"
                    >Find</el-button
                  >
                </el-form-item>
                <el-form-item label="Study Title">
                  <el-select
                    id="StudyTitle"
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
                  <el-button type="primary" @click="findData('title', title)"
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
              Please use one of the filters above to refine your search...
            </p>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import DataResult from "@/components/DataResult";
import cardioTypes from "@/assets/cardioTypes";
import geneNames from "@/assets/geneNames";
import studyTitles from "@/assets/studyTitles";
import datastoreService from "@/services/DatastoreService";

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

    async function findData(whereColumn, query) {
      results.value = await datastoreService.getDataToDelete(
        user,
        whereColumn,
        query
      );
    }

    function deleteData(documentId) {
      datastoreService.deleteData(documentId, user);
      results.value = [];
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
