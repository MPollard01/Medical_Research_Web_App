<template>
  <div>
    <div v-if="loading" id="loading">
        <img
          id="loading-image"
          src="../assets/ajax-loader.gif"
          alt="Loading..."
        />
    </div>
    <el-autocomplete
      class="inline-input"
      v-model="query"
      :fetch-suggestions="querySearch"
      placeholder="Search gene"
      :trigger-on-focus="false"
     @select="handleSelect"
    >
    
    </el-autocomplete>
    
  </div>
</template>

<script>
import datastoreService from '@/services/DatastoreService';
import apiService from '@/services/APIService';
import firebase from "firebase";

export default {
  data() {
      return {
        links: [],
        query: '',
        loading: false,
        user: null
      }
  },
  methods: {
    querySearch(queryString, cb) {
      const links = this.links;
      const results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return apiService.apiLinks;
    },
    async handleSelect(item) {
      this.loading = true;
      const apiData = await apiService.getApiData(item.link);
      const datastoreData = await datastoreService.getDataByGene(item.value);

      if (apiData || datastoreData) {
        this.loading = false;
      }

      this.$emit('handleSearch', {
        apiData,
        datastoreData,
        name: item.value
      })

    }
  },
  mounted () {
    this.links = this.loadAll();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
