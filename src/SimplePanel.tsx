import  React, { } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
//import { v4  as uuid } from "uuid";
//import  * as echarts  from "echarts";
import Chart  from "./Chart";


interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {

  console.log(options)
  window.onload = Chart("t",options,data)
  //tt() 
  return (
    <div className="App">
      <div id="t" style={{ width: width, height: height}} >
        sdf
      </div>
    </div>
  );
}
