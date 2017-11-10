/**
 * Created by WolfTungsten on 2017/11/10.
 */
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {signin} from '../Functions/Fetch';
import TextField from 'material-ui/TextField';

export default class SigininDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            msg:'您需要要先登录才能够使用ITEN智能网球机',
            errText:''
        }
    }

    handleSignin = async ()=>{
        try{
            let token = await signin(this.state.username, this.state.password);
            token = token.token;
            this.props.handleToken(token);
        }
        catch(e){
            this.setState({errText:'请检查您的用户名和密码是否输入正确'})
        }
    };



    render(){
        const actions = [
            <FlatButton label="登录" onClick={this.handleSignin} />
        ]
        return(
            <Dialog
            title="请登录"
            actions={actions}
            modal={false}
            open={this.props.open}
            onRequestClose={this.handleClose}
            >
                {this.state.msg}
                <TextField
                    hintText="您的用户名"
                    floatingLabelText="用户名"
                    floatingLabelFixed={true}
                    onChange={(e,v)=>{this.setState({username:v})}}
                    errorText={this.state.errText}
                />
                <TextField
                    hintText="请输入密码"
                    floatingLabelText="密码"
                    floatingLabelFixed={true}
                    type="password"
                    onChange={(e,v)=>{this.setState({password:v})}}
                />
            </Dialog>
        )
    }
}