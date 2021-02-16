import * as echarts from 'echarts';
import {PanelData} from "@grafana/data"
import { SimpleOptions } from "./types";
import { v4 as uuid } from "uuid";

function Chart(id:string,option:SimpleOptions, data:PanelData):any {
  var cId = uuid();
  console.log(cId)
  var t = document.getElementById('t')
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
        option: option.legendLeft,
      },
      label:{
        show:option.labelShow
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
    eoption.series.push({type:type,data:dataSet,radius:option.radius.split(",")})
  }
}
export default Chart;