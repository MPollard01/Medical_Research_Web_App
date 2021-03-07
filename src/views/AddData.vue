<template>
  <div class="wrap">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="head">
          <h2 class="title">Add Data To Our Database</h2>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <div>
          <el-card shadow="always" class="box-card">
            <template #header>
              <div class="card-header">
                <span class="card-title">Cardiomyopathy Details</span>
              </div>
            </template>
            <div>
              <el-form status-icon label-width="180px">
                <el-form-item label="Phenotype">
                  <el-select
                    id="Phenotype"
                    v-model="cardioType.value"
                    :ref="cardioType.ref"
                    filterable
                    clearable
                    allow-create
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
                  <span class="error" v-if="cardioType.error">{{
                    cardioType.error.message
                  }}</span>
                </el-form-item>
                <el-form-item label="Gene Name">
                  <el-select
                    id="GeneName"
                    v-model="geneName.value"
                    :ref="geneName.ref"
                    filterable
                    clearable
                    allow-create
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
                  <span class="error" v-if="geneName.error">{{
                    geneName.error.message
                  }}</span>
                </el-form-item>
                <el-form-item label="Study Title">
                  <el-select
                    id="StudyTitle"
                    v-model="title.value"
                    :ref="title.ref"
                    filterable
                    clearable
                    allow-create
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
                  <span class="error" v-if="title.error">{{
                    title.error.message
                  }}</span>
                </el-form-item>
                <el-form-item label="Additional Notes (optional)">
                  <el-input
                    type="textarea"
                    rows="5"
                    resize="none"
                    maxlength="200"
                    show-word-limit
                    v-model="notes"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="upload" @click="onSubmit"
                    >Upload</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-card shadow="always" class="box-card">
            <template #header>
              <div class="card-header">
                <span class="card-title">Upload File</span>
              </div>
            </template>
            <div>
              <el-upload
                id="upload"
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                accept=".csv"
              >
                <p>
                  The CSV data will be used to plot graphical charts that will
                  be displayed when this data is searched.
                </p>
                <el-button size="small" type="success" id="UploadButton"
                  >Click to upload</el-button
                >
                <template #tip>
                  <div class="el-upload__tip">
                    Upload CSV file
                  </div>
                </template>
              </el-upload>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
import { timestamp } from "@/firebase/database";
import { useForm } from "vue-hooks-form";
import { ElMessage, ElMessageBox } from "element-plus";
import Papa from "papaparse";

import cardioTypes from "@/assets/cardioTypes";
import geneNames from "@/assets/geneNames";
import studyTitles from "@/assets/studyTitles";
import datastoreService from "@/services/DatastoreService";

export default {
  name: "AddData",
  setup() {
    const user = ref(null);
    const notes = ref("");
    const upload = ref(null);

    const { useField, handleSubmit } = useForm({
      defaultValues: {},
    });

    const cardioType = useField("phenotype", {
      rule: { required: true },
    });

    const geneName = useField("gene name", {
      rule: { required: true },
    });

    const title = useField("title", {
      rule: { required: true },
    });

    let csv = [];

    function handleSuccess(response, file, fileList) {
      console.log(fileList[0]);
      Papa.parse(file.raw, {
        header: true,
        complete: function(results) {
          csv = results.data;
          let columnLen = Object.keys(csv[0]).length;
          if (columnLen > 3) {
            ElMessageBox.alert("This file exceeds 2 columns", "Removing File", {
              confirmButtonText: "OK",
              callback: (action) => {
                ElMessage.info({
                  type: "info",
                  message: `action: ${action} removed ${file.name}`,
                });
              },
            });

            upload.value.clearFiles();
          }
        },
      });
    }

    const onSubmit = () => {
      ElMessageBox.confirm("Are you sure you want to send?", "Confirm", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          ElMessage.success({
            type: "success",
            message: "Added data to database",
          });
          const formData = {
            cardioType: cardioType.value,
            geneName: geneName.value,
            title: title.value,
            notes: notes.value,
            createdBy: user.value.uid,
            createdAt: timestamp(),
            data: csv,
          };
          
          datastoreService.addData(formData)

          csv = [];
        })
        .catch(() => {
          ElMessage.info({
            type: "info",
            message: "Upload canceled",
          });
        });
    };

    return {
      user,
      cardioTypes,
      geneName,
      studyTitles,
      cardioType,
      geneNames,
      title,
      notes,
      onSubmit: handleSubmit(onSubmit),
      handleSuccess,
      upload,
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

.card-header {
  text-align: left;
  font-weight: bold;
}
p {
  text-align: left;
}
.el-select {
  width: 100%;
}

.upload {
  float: right;
}
.error {
  color: red;
  padding: 0;
  margin: 0;
  opacity: 0.6;
  font-size: 12px;
  line-height: 15px;
}
</style>
