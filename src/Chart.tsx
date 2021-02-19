import * as echarts from 'echarts';
import {PanelData} from "@grafana/data"
import { SimpleOptions } from "./types";

function Chart(id:string,option:SimpleOptions, data:PanelData):any {
  var t = document.getElementById(id)
  if (t != null) {
    var myChart = echarts.init(t);
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
        top: option.legendTop
      },
      series:[]
    };
    buildOptions(option.type,data,eoption,option)
    myChart.setOption(eoption)  
  } 
}
function buildOptions(type:string, data:PanelData,eoption:any,option:SimpleOptions):any {
  if (type=="pie") {
    var dataSet = [{}];
    var a = [{}];
    var b = [{}];
    console.log(data.series)
    data.series.map((s)=>{
    a = (s.fields.find(f=>f.type ==='string')?.values as any).buffer
    b = (s.fields.find(f=>f.type ==='number')?.values as any).buffer
    })
    for (let i = 0; i < 3; i++) {
      dataSet.push({name:a[i],value:b[i]});
    }
    eoption.series.push({type:type,data:dataSet,
      label:option.labelShow,radius:option.radius.split(",")})
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
  }
}
export default Chart;