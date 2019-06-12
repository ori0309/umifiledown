import styles from "./index.css";
import axios from "axios";
import Link from "umi/link";
import router from "umi/router";
import {
  Tree,
  Pagination,
  Layout,
  Icon,
  Input,
  Col,
  Row,
  Dropdown,
  Menu
} from "antd";
import { callbackify } from "util";
import { func } from "prop-types";
const { TreeNode, DirectoryTree } = Tree;
const { Content, Sider } = Layout;
const Search = Input.Search;
const onClick = e => {
  console.log("Click on item", e);
};
const initKeyFun = (that, a, b) => {
  that.setState({ [a]: 0 });
  that.setState({ [b]: 0 });
};
function arraySortByName(list) {
  if (list === undefined || list === null) return [];
  list.sort((a, b) => {
    let strA = a.name;
    let strB = b.name;
    // 谁为非法值谁在前面
    if (
      strA === undefined ||
      strA === null ||
      strA === "" ||
      strA === " " ||
      strA === "　"
    ) {
      return -1;
    }
    if (
      strB === undefined ||
      strB === null ||
      strB === "" ||
      strB === " " ||
      strB === "　"
    ) {
      return 1;
    }
    // 如果a和b中全部都是汉字，或者全部都非汉字
    if (
      (strA.split("").every(char => notChinese(char)) &&
        strB.split("").every(char => notChinese(char))) ||
      (strA.split("").every(char => !notChinese(char)) &&
        strB.split("").every(char => !notChinese(char)))
    ) {
      return strA.localeCompare(strB);
    } else {
      const charAry = strA.split("");
      for (const i in charAry) {
        if (charCompare(strA[i], strB[i]) !== 0) {
          return charCompare(strA[i], strB[i]);
        }
      }
      // 如果通过上面的循环对比还比不出来，就无解了，直接返回-1
      return -1;
    }
  });
  return list;
}

function charCompare(charA, charB) {
  // 谁为非法值谁在前面
  if (
    charA === undefined ||
    charA === null ||
    charA === "" ||
    charA === " " ||
    charA === "　"
  ) {
    return -1;
  }
  if (
    charB === undefined ||
    charB === null ||
    charB === "" ||
    charB === " " ||
    charB === "　"
  ) {
    return 1;
  }
  // 如果都为英文或者都为汉字则直接对比
  if (
    (notChinese(charA) && notChinese(charB)) ||
    (!notChinese(charA) && !notChinese(charB))
  ) {
    return charA.localeCompare(charB);
  } else {
    // 如果不都为英文或者汉字，就肯定有一个是英文，如果a是英文，返回-1，a在前，否则就是b是英文，b在前
    if (notChinese(charA)) {
      return -1;
    } else {
      return 1;
    }
  }
}

function notChinese(char) {
  const charCode = char.charCodeAt(0);
  return charCode >= 0 && charCode <= 128;
}
// 定义搜索内容
const menu = (
  <Menu selectable onClick={onClick}>
    <Menu.Item>文件名</Menu.Item>
    <Menu.Item>大小</Menu.Item>
    <Menu.Item>修改时间</Menu.Item>
  </Menu>
);
export default class Tre extends React.Component {
  constructor(props) {
    super(props);
    this.page = { pageNum: 1, pageSize: 10 };
    this.state = {
      currentIndex: 0,
      filelist: [],
      downlist: [],
      initDownList: [],
      paramsDate: "",
      nameKey: 0,
      sizeKey: 0,
      dateKey: 0
    };
  }
  // 组件挂载完成
  async componentDidMount() {
    var that = this;
    var response = await axios.get("/api/filelist");
    that.setState({ filelist: response.data.data });
    var firstDate = response.data.data[0].name;
    // 获取第一个日期的信息
    var firstDateData = await axios.post("/api/downlist", {
      
        ID: firstDate
      
    });
    // 复制一个新的数组作为初始数据
    const initDataList = [...firstDateData.data.data];
    that.setState({ initDownList: initDataList });
    that.setState({ downlist: firstDateData.data.data });
  }
  // 设置索引值 左侧选中样式
  setCurrentindex(e) {
    var index = e.currentTarget.getAttribute("index");
    this.setState({ currentIndex: index });
  }
  // 获取iconkey  name字段
  handleIcon(e) {
    initKeyFun(this, "sizeKey", "dateKey");
    // 按照名称进行排序
    this.setState({ downlist: arraySortByName(this.state.downlist) });
    var key = e.currentTarget.getAttribute("filenamekey");
    this.setState({ nameKey: parseInt(key) + 1 });
    this.setState;
    if (this.state.nameKey == 1) {
      const newinitlist = [...this.state.initDownList];
      this.setState({ downlist: newinitlist });
      this.setState({ nameKey: 0 });
    }
  }
  // 获取大小size字段
  handleSizeIcon(e) {
    initKeyFun(this, "nameKey", "dateKey");
    // this.setState({ nameKey: 0});
    // this.setState({ dateKey: 0});
    var key = e.currentTarget.getAttribute("sizekey");
    this.setState({ sizeKey: parseInt(key) + 1 });
    if (this.state.sizeKey == 2) {
      this.setState({ sizeKey: 0 });
      this.setState({ downlist: this.state.initDownList });
    } else if (this.state.sizeKey == 0) {
      // 从小到大
      const sortArr = [...this.state.initDownList];
      var smallBig = sortArr.sort((a, b) => a.size - b.size);
      this.setState({ downlist: smallBig });
    } else if (this.state.sizeKey == 1) {
      // 从大到小
      const sortArr = [...this.state.initDownList];
      var bigSmall = sortArr.sort((a, b) => b.size - a.size);
      this.setState({ downlist: bigSmall });
    }
  }
  // 获取时间date字段
  handleDateIcon(e) {
    initKeyFun(this, "sizeKey", "nameKey");
    // this.setState({ sizeKey: 0});
    // this.setState({ nameKey: 0});
    var key = e.currentTarget.getAttribute("datekey");
    this.setState({ dateKey: parseInt(key) + 1 });
    var timeFun = finishDate => {
      finishDate = finishDate.replace("-", "/"); //替换字符，变成标准格式
      return new Date(Date.parse(finishDate));
    };
    if (this.state.dateKey == 2) {
      this.setState({ dateKey: 0 });
      this.setState({ downlist: this.state.initDownList });
    }else if (this.state.dateKey == 1) {
      const sortArr = [...this.state.initDownList];
      var bigSmall = sortArr.sort((a, b) => timeFun(b.date) - timeFun(a.date));
      this.setState({ downlist: bigSmall });
    }else if (this.state.dateKey == 0) {
      const sortArr = [...this.state.initDownList];
      var bigSmall = sortArr.sort((a, b) => timeFun(a.date) - timeFun(b.date));
      this.setState({ downlist: bigSmall });
    }
  }
  render() {
    return (
      <Row type="flex" justify="start">
        <Col span={4} className={styles.fixClass}>
          {this.state.filelist.map((item, index) => {
            return (
              <div
                key={index}
                index={index}
                className={
                  this.state.currentIndex == index
                    ? styles.active + " " + styles.fileDiv
                    : styles.fileDiv
                }
                onClick={this.setCurrentindex.bind(this)}
              >
                <Icon type="folder" />
                &nbsp;{item.name}
              </div>
            );
          })}
        </Col>

        <Col span={20} className={styles.fixClas}>
          <Row className={styles.search}>
            {/* <Col span={8} offset={15}> */}
            {/* 搜索功能 */}
            <div style={{ float: "right", marginRight: "180px" }}>
              {/* <Dropdown overlay={menu}>
                  <Icon
                    className={styles.ico}
                    type="menu"
                    style={{
                      float: "right",
                      cursor: "pointer",
                      position: "relative",
                      top: "9px",
                      marginLeft: "10px"
                    }}
                  />
                </Dropdown> */}
              <Search
                placeholder="请输入关键词"
                onSearch={value => console.log(value)}
                style={{ width: 200, float: "right" }}
              />
            </div>
            {/* 筛选功能按照时间 */}
            <div className={styles.searchTypeBox}>
              <span
                className={styles.searchTypeName}
                filenamekey={this.state.nameKey}
                onClick={this.handleIcon.bind(this)}
              >
                文件名
              </span>
              <Icon
                type="caret-down"
                className={
                  this.state.nameKey == 1
                    ? styles.iconActive + " " + styles.nameUp
                    : styles.nameUp
                }
              />
              <span
                className={styles.searchTypeName}
                onClick={this.handleSizeIcon.bind(this)}
                sizekey={this.state.sizeKey}
              >
                大小
              </span>
              <Icon
                type="caret-up"
                className={
                  this.state.sizeKey == 1
                    ? styles.iconActive + " " + styles.sizeUp
                    : styles.sizeUp
                }
              />
              <Icon
                type="caret-down"
                className={
                  this.state.sizeKey == 2
                    ? styles.iconActive + " " + styles.sizeDown
                    : styles.sizeDown
                }
              />
              <span
                className={styles.searchTypeName}
                onClick={this.handleDateIcon.bind(this)}
                datekey={this.state.dateKey}
              >
                修改时间
              </span>
              <Icon
                type="caret-up"
                className={
                  this.state.dateKey == 1
                    ? styles.iconActive + " " + styles.sizeUp
                    : styles.sizeUp
                }
              />
              <Icon
                type="caret-down"
                className={
                  this.state.dateKey == 2
                    ? styles.iconActive + " " + styles.sizeDown
                    : styles.sizeDown
                }
              />
            </div>
          </Row>
          <Col span={20} className={styles.fixClass}>
            {this.state.downlist.map((item, index) => {
              return (
                <Col span={8} className={styles.fileBox} key={index}>
                  <div>名字：{item.name}</div>
                  <div>大小：{item.size}</div>
                  <div>日期：{item.date}</div>
                </Col>
              );
            })}
          </Col>
        </Col>
      </Row>
    );
  }
}
