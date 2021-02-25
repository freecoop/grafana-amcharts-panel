import  * as echart from "./echarts"
import {PanelData} from "@grafana/data";
import { SimpleOptions } from "./types";
import {config} from '@grafana/runtime';

function Chart(id:string,option:SimpleOptions, data:PanelData):any {
  var theme = config.theme.isDark?'dark':"";
  console.log(config.theme.colors.dashboardBg)
  
  var t = document.getElementById(id)
  if (t != null) {
    var myChart = echart.init(t,theme);
    var eoption = {
      title: {
        text: option.title,
        subtext: option.subTitle,
        left: option.titleLeft
      },
     
      tooltip: {},
      legend: {
        show: option.legendShow,
        orient: option.legendOrient,
        left: option.legendLeft,
        top: option.legendTop,
      },
      series:[]
    };
    buildOptions(option.type,data,eoption,option)
    myChart.setOption(eoption)  
  } 
}
function buildOptions(type:string, data:PanelData,eoption:any,option:SimpleOptions):any {
  if (type=="pie") {
    var labelFormatter =  option.labelPercentage?"{b} {c}({d})%":"{b} {c}";
    var dataSet = [{}];
    var a = [{}];
    var b = [{}];
    console.log(data.series)
    data.series.map((s)=>{
    a = (s.fields.find(f=>f.type ==='string')?.values as any).buffer
    b = (s.fields.find(f=>f.type ==='number')?.values as any).buffer
    })
    for (let i = 0; i < a.length; i++) {
      dataSet.push({name:a[i],value:b[i]});
    }
    eoption.series.push({
      type:type,
      label:{
        show:option.labelShow,
        formatter:labelFormatter
      },
      data:dataSet,
      radius:option.radius.split(",")
    })
  }else if("bar" ==type){
    var a = [{}];
    var b = [{}];
    data.series.map((s)=>{
    a = (s.fields.find(f=>f.type ==='string')?.values as any).buffer
    b = (s.fields.find(f=>f.type ==='number')?.values as any).buffer
    })
    eoption.xAxis = {
      data:a
    }
    eoption.yAxis ={}
    eoption.series.push({
      type:option.type,
      data:b
    })
    console.log();
    
  }
}
export default Chart;