/**
 * Created by WolfTungsten on 2017/11/10.
 */
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {signin,geetest} from '../Functions/Fetch';
import TextField from 'material-ui/TextField';
import '../SDK/gt'
import SignupCard from './SignupCard';
import {Card, CardMedia, CardTitle, CardText, CardHeader, CardActions} from 'material-ui/Card';


const handlerGeetest = function(result) {
    console.log(result);
};


export default class SigininCard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            msg:'您需要要先登录才能够使用ITEN智能网球机',
            errText:'',
            geetest_challenge: '',
            geetest_validate: '',
            geetest_seccode: '',
            enable:false,
            openSignup:false
        }
    }

    componentDidMount(){
        const that = this;
        geetest().then((data)=>{
            console.log(data);
            this.setState({
                gt:data.gt,
                challenge:data.challenge,
                success:data.success
            });
            window.initGeetest({
                // 以下配置参数来自服务端 SDK
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: data.new_captcha,
                width: '100%'
            }, function (captchaObj) {
                // 这里可以调用验证实例 captchaObj 的实例方法
                captchaObj.appendTo('#geetest-signin');
                captchaObj.onSuccess(()=>{
                    let result = captchaObj.getValidate();
                    that.setState({
                        geetest_challenge: result.geetest_challenge,
                        geetest_validate: result.geetest_validate,
                        geetest_seccode: result.geetest_seccode,
                        enable:true
                    })
                })
            })
        });
    }

    handleSignin = async ()=>{
        try{
            let token = await signin(this.state.username, this.state.password, this.state.geetest_challenge, this.state.geetest_validate, this.state.geetest_seccode);
            token = token.token;
            this.props.handleToken(token);
        }
        catch(e){
            console.log(e);
            this.setState({errText:'请检查您的用户名和密码是否输入正确'})
        }
    };

    openSignup = ()=>{
        this.setState({openSignup:true})
    }

    closeSignup = ()=>{
        this.setState({openSignup:false})
    }



    render(){
        const actions = [
            <FlatButton label="登录" onClick={this.handleSignin} disabled={!this.state.enable}/>,
            <FlatButton label="新用户？" onClick={this.openSignup} />
        ];
        return(

            <div style={{width:'100%',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                {this.state.openSignup?
                <SignupCard close={this.closeSignup}/>
                :<Card style={{width:'90%', marginTop:'20px',marginBottom:'20px'}}>
                <CardTitle title="用户登录" subtitle="您需要先登录才能使用ITEN智能网球机"/>
                <CardText>
                    {this.state.msg}
                    <div className="dialog-body">
                        <TextField
                            fullWidth={true}
                            hintText="您的用户名"
                            floatingLabelText="用户名"
                            floatingLabelFixed={true}
                            onChange={(e,v)=>{this.setState({username:v})}}
                            errorText={this.state.errText}
                        />
                        <TextField
                            fullWidth={true}
                            hintText="请输入密码"
                            floatingLabelText="密码"
                            floatingLabelFixed={true}
                            type="password"
                            onChange={(e,v)=>{this.setState({password:v})}}
                        />
                        <div style={{width:'80px'}} id="geetest-signin"></div>
                    </div>
                </CardText>

                <CardActions> {actions}</CardActions>
            </Card>}
            </div>
        )
    }
}