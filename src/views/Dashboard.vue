<template>
    <div class="wrap">
      <!--<ProfileCard />-->
      <div class="head">
        <h2 class="title">Dashboard</h2>
        <SearchBar @handleSearch="onSeachChild"/>
      </div>
      <el-divider></el-divider>
        <div v-if="data" class="content">
          <InfoCard v-if="data && data.apiData" :terms="data.apiData.terms" :name="data.name"/>
          <CommonChart v-if="data && data.datastoreData" :graphs="data.datastoreData.graphs"/>
        </div>
        <div v-if="!data " class="empty">
          <Empty />
        </div>
    </div>
  
</template>

<script>
import { ref, onMounted } from "vue";
import {useRouter} from 'vue-router'
import firebase from "firebase";
import CommonChart from '@/components/CommonChart';
import SearchBar from '@/components/SearchBar';
//import ProfileCard from '@/components/ProfileCard';
import Empty from '@/components/Empty';
import InfoCard from '@/components/InfoCard';

export default {
  name: "Dashboard",
  setup() {
    const user = ref(null);
    const data = ref(null)
    const router = useRouter()

    onMounted(() => {
      let searchData = router.params
      console.log(searchData)
    })

    function onSeachChild (value) {
      console.log(value);
      data.value = value;
    }

    return { user, data, onSeachChild };
  },
  components: {
    CommonChart,
    SearchBar,
    //ProfileCard,
    Empty,
    InfoCard
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

  
</style>
