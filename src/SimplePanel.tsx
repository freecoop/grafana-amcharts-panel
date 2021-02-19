import  React, { useEffect} from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { v4  as uuid } from "uuid";
//import  * as echarts  from "echarts";
import Chart  from "./Chart";

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  var id = uuid();
  useEffect(() => {
    Chart(id,options,data)
  }, []);
  window.onload = Chart(id,options,data)
  return (
    <div className="App">
      <div id={id} style={{ width: width, height: height}} >
        echarts
      </div>
    </div>
  );
}
