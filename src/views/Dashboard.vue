<template>
    <div class="wrap">
      <div class="head">
        <h2 class="title">Dashboard</h2>
        <SearchBar @handleSearch="onSeachChild"/>
        <p @click="handleShowAdvancedSearch" class="advanced-search">Advanced Search</p>
      </div>
      <div v-if="showAdvancedSearch" class="content">
        <AdvancedSearch @handleAdvancedSearch="onAdvancedSearchChild" :closeAdvancedSearch="handleCloseAdvancedSearch" />
      </div>
      <el-divider></el-divider>
        <div v-if="data || advancedData" class="content">
          <InfoCard v-if="data && data.apiData" :terms="data.apiData.terms" :name="data.name"/>
          <InfoCard v-if="advancedData" :terms="advancedData.terms" :name="advancedData.name"/>
          <CommonChart v-if="data && data.datastoreData" :graphs="data.datastoreData.graphs"/>
        </div>
        <div v-if="!data && !advancedData" class="empty">
          <Empty />
        </div>
    </div>
  
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
import CommonChart from '@/components/CommonChart';
import SearchBar from '@/components/SearchBar';
import Empty from '@/components/Empty';
import InfoCard from '@/components/InfoCard';
import AdvancedSearch from '@/components/AdvancedSearch';

export default {
  name: "Dashboard",
  
  setup() {
    const user = ref(null);
    const data = ref(null);
    const advancedData = ref(null);
    const showAdvancedSearch = ref(false);

    function onSeachChild (value) {
      console.log(value);
      data.value = value;
      advancedData.value = null
    }

    function onAdvancedSearchChild (value) {
      console.log(value)
      advancedData.value = value
      data.value = null
    }

    function handleShowAdvancedSearch() {
      showAdvancedSearch.value = true;
    }

    function handleCloseAdvancedSearch() {
      showAdvancedSearch.value = false;
    }

    return { 
      user, 
      data, 
      advancedData,
      onSeachChild, 
      onAdvancedSearchChild,
      showAdvancedSearch, 
      handleShowAdvancedSearch,
      handleCloseAdvancedSearch
    };
  },
  components: {
    CommonChart,
    SearchBar,
    Empty,
    InfoCard,
    AdvancedSearch
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    display: flex;
    width: 100%;
  }

  .dashboard {
    width: 800px
  }

  .title {
    text-align: left;
    margin-right: 8em;
  }

  .advanced-search {
    font: 16px;
    color: #c28adb;
    margin-left: 1rem;
  }

  .advanced-search:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  
</style>
