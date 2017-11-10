import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Material UI组件
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//外部函数变量类型
import axios from 'axios'
import {getCookie, setCookie} from './Functions/Cookies'
import * as config from'./Configs/Config'
import * as fetch from './Functions/Fetch'
//自定义组件
import SigininDialog from "./Components/SigninDialog";
import UserInfoBoard from "./Components/UserInfoBoard";
import VideoCard from "./Components/VideoCard";
import DeployCard from "./Components/DeployCard";
class App extends Component {

  constructor(props){

      super(props);
      this.state={
          hasUserInfo:false,
          userInfo:{
              username:'',
              privilege:0,
              phone_number:'',
              timer:0
          },
          hasMachine:false,
          machineId:'',
          machineState:'',
          trainName:'',
          trainAmount:'',
          trainCount:''

      };

      //初始化axios全局配置
      axios.defaults.baseURL = config.baseUrl;

      //读取Cookie
      let accessToken = getCookie('Access-Token');
      if(accessToken){
          axios.defaults.headers.common['Access-Token'] = accessToken;
          //TODO:发起获取用户信息的请求并写入state
          this.getUserInfo();
      }
  }

  handleToken = (token) => {
      axios.defaults.headers.common['Access-Token'] = token;
      setCookie('Access-Token',token);
      this.getUserInfo();
  };

  getUserInfo = async() => {
      let userInfo = await fetch.getUserInfo();
      console.log(userInfo);
      this.setState({
          hasUserInfo:true,
          userInfo:{
              username:userInfo.username,
              privilege:userInfo.privilege,
              timer:userInfo.timer
          }
      });
      setInterval(this.refreshTask, 1000);
  };

  refreshTask = async ()=>{
      const res = await fetch.getStatus();
      if(res['has']){
          this.setState({
              hasMachine:true,
              machineId:res.machine_id,
              machineState:res.state,
              trainName:res.train_name,
              trainAmount:res.train_amount,
              trainCount:res.train_count
          });
      }
      else{
          this.setState({
              hasMachine:false,
          });
      }
  }
  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div className="App-body">
                <AppBar
                title = {"ITEN智能网球机"}
                iconElementLeft = {<IconButton><NavigationClose /></IconButton>}
                />
                <SigininDialog
                    open = {!this.state.hasUserInfo}
                    handleToken = {this.handleToken}
                />
                {this.state.hasUserInfo?
                <UserInfoBoard
                    userInfo={this.state.userInfo}
                />: <div></div>}
                {this.state.hasUserInfo && !this.state.hasMachine?
                    <VideoCard/>: <div></div>}
                {this.state.hasUserInfo && !this.state.hasMachine?
                    <DeployCard/>: <div></div>}
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
