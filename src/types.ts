
export interface SimpleOptions {
  text: string;
  title: string;
  subTitle: string;
  titleLeft: string;
  labelShow: boolean;
  legendShow: boolean;
  legendLeft:string;
  legendTop:string;
  legendOrient:string;
  singleType: boolean;
  type: string; //only working on singleType
  types: string; // csv for multi series
  //pie only
  radius:string;
}
