import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Layout, PlotData } from "plotly.js";
import Select from "react-select";

type Props = {};

const ThreeGraph: React.FC<Props> = () => {
  // データ群1
  const data1: {
    type: string;
    x: number[];
    y: number[];
    z: number[];
    category: number[];
    marker: { symbol: string; opacity: number; size: number };
    mode: string;
    text: string[];
    name: string;
  } = {
    //Partial<PlotData> = {
    type: "scatter3d",
    x: [1, 5, 9, 7],
    y: [-9, 4, 3, 0],
    z: [2, 2, 2, 2],
    category: [1, 2, 1, 3],
    marker: { symbol: "circle", opacity: 1, size: 3 },
    mode: "markers",
    text: ["A", "B", "C", "D"],
    name: "Group_1"
  };
  // データ群2 群1と群2は自動で色分け
  // 手動で設定したいなら marker:{color:***}
  const data2: any = {
    //Partial<PlotData> = {
    type: "scatter3d",
    x: [-6, 5, 3, -2],
    y: [-4, 9, 4, 6],
    z: [-2, -2, -2, -2],
    category: [3, 1, 1, 2],
    marker: { symbol: "circle", opacity: 1, size: 3, color: "#6B7782" },
    mode: "markers",
    text: ["E", "F", "G", "H"],
    name: "Group_2"
  };

  const [plotData1, setPlotData1] = useState(data1);
  const [plotData1Org, setPlotData1Org] = useState(data1);
  const [plotData2, setPlotData2] = useState(data2);
  const [plotData2Org, setPlotData2Org] = useState(data2);
  const allData: Partial<PlotData>[] = [plotData1, plotData2];
  const [allPlotData, setAllPlotData] = useState(allData);

  // タイトル
  const layout1: Partial<Layout> = { title: "３次元グラフ" };

  // 選択中メニュー
  const [selectCat, setSelectCat] = useState("all");
  // データ群１と２の全categoryをプルダウンのメニューにする
  const allCateTemp = data1.category.concat(data2.category);
  const categories = Array.from(new Set(allCateTemp));
  // プルダウン用のデータに整形
  let options: any[] = [{ value: "all", label: "all" }];
  categories.forEach(category => {
    let catMenu: { [key: string]: number } = {};
    catMenu[String(category)] = Number(category);
    options.push({ value: String(category), label: String(category) });
  });
  // プルダウンからメニューを選択する処理
  const menuChange = (targetCat: any) => {
    console.log(targetCat);
    setSelectCat(targetCat.value);
    if (targetCat.value != "all") {
      let newX: number[] = [];
      let newY: number[] = [];
      let newZ: number[] = [];
      let newC: number[] = [];
      for (let index = 0; index < plotData1Org.category.length; index++) {
        if (targetCat.value === String(plotData1Org.category[index])) {
          newX.push(plotData1Org.x[index]);
          newY.push(plotData1Org.y[index]);
          newZ.push(plotData1Org.z[index]);
          newC.push(plotData1Org.category[index]);
        }
      }
      setPlotData1(preData => {
        const newData = { ...preData };
        newData.x = newX;
        newData.y = newY;
        newData.category = newC;
        console.log("new data1:", newData);
        return newData;
      });
    } else {
      let newAllData: Partial<PlotData>[] = [plotData1Org, plotData2Org];
      setAllPlotData(newAllData);
    }
  };
  // データの内容が変わったら
  useEffect(() => {
    setAllPlotData(preAllData => {
      let newData = { ...preAllData };
      newData = [plotData1, plotData2];
      console.log("new Alldata1:", newData);
      return newData;
    });
  }, [plotData1]);

  return (
    <div>
      {selectCat}
      <Select options={options} onChange={menuChange} />
      <Plot data={allPlotData} layout={layout1} />;
    </div>
  );
};

export default ThreeGraph;
