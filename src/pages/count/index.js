import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
const { Text, Line } = Guide;
import DataSet from "@antv/data-set";

export default class Count extends React.Component {
  render() {
    const data = [
      {
        month: "Jan",
        city: "Tokyo",
        temperature: 7
      },
      {
        month: "Jan",
        city: "London",
        temperature: 3.9
      },
      {
        month: "Feb",
        city: "Tokyo",
        temperature: 6.9
      },
      {
        month: "Feb",
        city: "London",
        temperature: 4.2
      },
      {
        month: "Mar",
        city: "Tokyo",
        temperature: 9.5
      },
      {
        month: "Mar",
        city: "London",
        temperature: 5.7
      },
      {
        month: "Apr",
        city: "Tokyo",
        temperature: 14.5
      },
      {
        month: "Apr",
        city: "London",
        temperature: 8.5
      },
      {
        month: "May",
        city: "Tokyo",
        temperature: 18.4
      },
      {
        month: "May",
        city: "London",
        temperature: 11.9
      },
      {
        month: "Jun",
        city: "Tokyo",
        temperature: 21.5
      },
      {
        month: "Jun",
        city: "London",
        temperature: 15.2
      },
      {
        month: "Jul",
        city: "Tokyo",
        temperature: 25.2
      },
      {
        month: "Jul",
        city: "London",
        temperature: 17
      },
      {
        month: "Aug",
        city: "Tokyo",
        temperature: 26.5
      },
      {
        month: "Aug",
        city: "London",
        temperature: 16.6
      },
      {
        month: "Sep",
        city: "Tokyo",
        temperature: 23.3
      },
      {
        month: "Sep",
        city: "London",
        temperature: 14.2
      },
      {
        month: "Oct",
        city: "Tokyo",
        temperature: 18.3
      },
      {
        month: "Oct",
        city: "London",
        temperature: 10.3
      },
      {
        month: "Nov",
        city: "Tokyo",
        temperature: 13.9
      },
      {
        month: "Nov",
        city: "London",
        temperature: 6.6
      },
      {
        month: "Dec",
        city: "Tokyo",
        temperature: 9.6
      },
      {
        month: "Dec",
        city: "London",
        temperature: 4.8
      }
    ];
    const cols = {
      month: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}°C`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
          <Guide>
            <Line
              top={true} // {boolean} 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
              start={{ month: "Aug", temperature: 26.5 }} // {object} | {function} | {array} 辅助线结束位置，值为原始数据值，支持 callback
              end={{ month: "Dec", temperature: 29 }} // 同 start
              lineStyle={{
                stroke: "#999", // 线的颜色
                lineDash: [0, 2, 2], // 虚线的设置
                lineWidth: 3 // 线的宽度
              }} // {object} 图形样式配置 https://bizcharts.net/products/bizCharts/api/graphic#线条样式
              text={{
                position: "start", // 'start' | 'center' | 'end' | '39%' | 0.5 文本的显示位置
                autoRotate: true, // {boolean} 是否沿线的角度排布，默认为 true
                style: {
                  fill: "red"
                }, // {object}文本图形样式配置,https://bizcharts.net/products/bizCharts/api/graphic#文本属性
                offsetX: 20, // {number} x 方向的偏移量
                offsetY: -10, // {number} y 方向的偏移量
                content: "预期收益趋势线" // {string} 文本的内容
              }}
            />
            <Text
              top // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
              position={['50%','1%']} // 文本的起始位置，值为原始数据值，支持 callback
              content="谁谁谁谁谁谁谁" // 显示的文本内容
              style={{
                fill: "#666", // 文本颜色
                fontSize: "12", // 文本大小
                fontWeight: "bold", // 文本粗细
                // rotate: 30 // 旋转角度
              }} // 文本的图形样式属性
              offsetX={11} // x 方向的偏移量
              offsetY={11} // y 方向偏移量
            />
          </Guide>
        </Chart>
      </div>
    );
  }
}
