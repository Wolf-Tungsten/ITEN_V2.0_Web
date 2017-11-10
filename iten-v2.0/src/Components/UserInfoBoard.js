/**
 * Created by WolfTungsten on 2017/11/10.
 */
/**
 * Created by WolfTungsten on 2017/11/10.
 */
import React, { Component } from 'react';


export default class UserInfoBoard extends React.Component{


    render(){

        return(
            <div className="user-info-board">
                <p className="user-info-board-text">{this.props.userInfo.username}, 欢迎回来!</p>
                <p>您已训练{this.props.userInfo.timer}小时，继续努力哦！</p>
            </div>
        )
    }
}