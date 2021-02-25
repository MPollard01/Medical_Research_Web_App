const getChartOptions = (data, name) => {
    const axisTitleArr = name.split("vs");
    const yTitle = axisTitleArr[0];
    const xTitle = axisTitleArr[1];
    const xCategories = data.map(obj => {
        return `${obj.x}`;
    })
    const yMin = 0;
    const yMax = 10;

    const chartOptions = {
        xaxis: {
          categories: xCategories.sort(),
          title: {
            text: xTitle
          }
        },
        yaxis: {
          title: {
            text: yTitle
          },
          min: yMin,
          max: yMax
        }
    }

    return chartOptions;
};

const getSeries = (data) => {
    const names = Object.keys(data[0]).filter((key) => {
        if(key !== 'x') {
            return key
        }
        return null
    });
    const series = names && names.map(name => {
        return {
                  name: name,
                  data: data.map(obj => {
                      return obj[name]
                  })
                }
    })

    return series;
}

export default {
    getChartOptions,
    getSeries
}