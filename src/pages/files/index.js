import styles from "./index.css";
import axios from 'axios';
import Link from "umi/link";
import router from "umi/router";
import { Tree,Pagination,Layout } from "antd";
const { TreeNode, DirectoryTree } = Tree;
const { Content, Sider } = Layout;
export default class Tre extends React.Component {
    constructor(props){
        super(props);
        this.page = {pageNum: 1, pageSize: 10};
    }
  onSelect = (keys, event) => {
    console.log("Trigger Select", keys, event);
  };

  onExpand = () => {
    console.log("Trigger Expand");
  };
  changePage(page,pageSize){
    console.log("111111",page)
    console.log("111111",pageSize)
    axios.get('/api/v2/users')
    // axios.get("https://www.baidu.com/s?ie=UTF-8&wd=baidu")
  }
  render() {
    return (
      <Layout>
        <Sider className={styles.leftWidth}>
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={this.onSelect}
            onExpand={this.onExpand}
          >
            <TreeNode title="parent 0" key="0-0">
              <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
              <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
            </TreeNode>
            <TreeNode title="parent 1" key="0-1">
              <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
              <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
            </TreeNode>
          </DirectoryTree>
        </Sider>
        <Content>
        <Pagination onChange={this.changePage} size="small" total={50}  showSizeChanger showQuickJumper />
        </Content>
      </Layout>
    );
  }
}
