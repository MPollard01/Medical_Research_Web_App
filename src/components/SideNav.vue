
<template>
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#727eaf"
  text-color="#fff"
  active-text-color="#c28adb"
  router="true"
  >
  <el-menu-item id="title" index="/">
    <span>Cardiomyopathy Platform</span>
    <img id="heart-icon" src="../assets/Realistic-Red-Heart.svg" alt="Heart Icon">
  </el-menu-item>
  <el-menu-item index="logout">Logout</el-menu-item>
  <el-submenu index="2">
    <template #title>Data</template>
    <el-menu-item index="add">Add</el-menu-item>
    <el-menu-item index="query">Query</el-menu-item>
  </el-submenu>
  <el-menu-item id="search-bg">
    <el-autocomplete placeholder="Search" v-model="search" id="search" :trigger-on-focus="false" :fetch-suggestions="querySearch">
      <template #prefix>
        <i @click="searchData" class="el-input__icon el-icon-search"></i>
      </template>
    </el-autocomplete>
  </el-menu-item>
</el-menu>
</template>

<script>
import {ref, onMounted} from 'vue'
import getCardioData from '../composables/externalData'
  export default {
    name: 'SideNav',

    setup() {
      const activeIndex = ref('/')
      const search = ref('')
      const suggestions = ref([])
      const hpoBaseUrl = 'https://hpo.jax.org/api/hpo'
      const {cardioData, error, fetchCardioData} = getCardioData()
      
      async function searchData() {
        let url = hpoBaseUrl + '/search/?q=' + search.value
        await fetchCardioData(url)
        let data = cardioData.value[0]
        if(data.terms.length > 0){
          for(let term of data.terms) {
            console.log(term)
          }
        }
        else {
          for(let gene of data.genes) {
            console.log(gene)
          }
        }
        
      }

      const querySearch = (queryString, cb) => {
      var results = queryString
        ? suggestions.value.filter(createFilter(queryString))
        : suggestions.value;
        // call callback function to return suggestions
        cb(results)
      }

      const createFilter = (queryString) => {
      return (suggestion) => {
        return (suggestion.value.toLowerCase().includes(queryString.toLowerCase()));
      };
    };

    const loadAll = () => {
      return [
        { "value": "cardiomyopathy", "link": "https://github.com/vuejs/vue" },
        { "value": "hypertrophic cardiomyopathy", "link": "https://github.com/ElemeFE/element" },
        { "value": "dilated cardiomyopathy", "link": "https://github.com/babel/babel" },
        { "value": "left ventricular non-compaction cardiomyopathy", "link": "https://github.com/babel/babel" },
        { "value": "MYBPC3", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "TPM1", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "MYH7", "link": "https://github.com/vuejs/vuex" },
        { "value": "TNNT", "link": "https://github.com/vuejs/vue-router" }
        ];
    };

    onMounted(() => {
      suggestions.value = loadAll();
    });

      
      return {activeIndex, search, suggestions, createFilter, querySearch, loadAll, searchData, cardioData, error}
    }

  }
</script>

<style>
  .el-submenu__title i {
    color: #fff !important
  }
  #title {
    margin-right: 3em;
  }
  #title:hover {
    background: none !important
  }
  #heart-icon {
    width: 25px;
    height: 25px;
    padding: 0 20px;
  }
  #search-bg {
    background: none !important
  }
  #search {
    border-radius: 15px;
    height: 30px;
  }
</style>
