<template>
  <div class="common-chart-wrapper">
    <el-dropdown @command="handleCommand">
      <el-button>
        Graphs<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="a">Action 1</el-dropdown-item>
        <el-dropdown-item command="b">Action 2</el-dropdown-item>
        <el-dropdown-item command="c">Action 3</el-dropdown-item>
      </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div id="chart">
        <VueApexCharts type="line" height="350" :options="chartOptions" :series="series"></VueApexCharts>
    </div>
  </div>
</template>

<script>
// import authenticationService from '@/services/AuthenticationService';
import VueApexCharts from 'vue3-apexcharts'

export default {
  data() {
      return {
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Product Trends by Month',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        }
      }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
    }
  },
  components: {
      VueApexCharts
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.common-chart-wrapper {
    margin-top: 1rem;
    text-align: left;
}

.el-button {
  margin-bottom: 1rem;
}
</style>
