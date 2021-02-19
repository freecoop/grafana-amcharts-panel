import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'title',
      name: 'Title',
    })
    .addTextInput({
      showIf: o => o.title !=undefined && o.title.length>0,
      path: 'subTitle',
      name: 'Title sub',
    })
    .addSelect({
      showIf: o => o.title !=undefined && o.title.length>0,
      path:'titleLeft',
      name: 'Title Position',
      settings:{
        options:[{value:'center',label:'Center'},
          {value:'left',label:"Left"},{value:'right',label:'Right'}]
      },
      defaultValue:'center'
    })
    .addBooleanSwitch({
      path:'labelShow',
      name: 'Label Show',
      defaultValue:false
    }) 
    .addBooleanSwitch({
      path:'legendShow',
      name: 'Legend Show',
      defaultValue:false
    })
    .addSelect({
      showIf:o => o.legendShow,
      path:'legendOrient',
      name: 'Legend Orient',
      settings:{
        options:[{value:"vertical",label:"Vertical"},
          {value:"horizontal",label:"Horizontal"}]
      },
      defaultValue:"vertical"
    })
    .addSelect({
      showIf:o => o.legendShow,
      path:'legendLeft',
      name: 'Legend Postion',
      settings:{
        options:[{value:"center",label:"Center"},
          {value:"left",label:"Left"},{value:"right",label:"Right"}]
      },
      defaultValue:'right'
    })
    .addSelect({
      showIf:o => o.legendShow,
      path:'legendTop',
      name: 'Legend Top',
      settings:{
        options:[{value:"top",label:"top"},
          {value:"middle",label:"middle"},{value:"bottom",label:"bottom"}]
      },
      defaultValue:'top'
    })
    .addBooleanSwitch({
      path: 'singleType',
      name: 'Single Type',
      defaultValue: true,
    })
    .addSelect({
      showIf: o => o.singleType,
      path:'type',
      name: 'Chart Type',
      settings:{
        options:[{value:"pie",label:"Pie"},
          {value:"line",label:"Line"},{value:"bar",label:"Bar"}]
      },
      defaultValue:"pie"
    })
    .addTextInput({
      showIf: o => o.singleType && "pie"==o.type,
      path:'radius',
      name: 'Radius',
      defaultValue:'40%,70%',
    })
    .addTextInput({
      showIf: o => !o.singleType,
      path:"types",
      name: 'Serise types(csv)'
    });
});
