/**
 * Created by WolfTungsten on 2017/11/10.
 */
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {signup,geetest,sms} from '../Functions/Fetch';
import TextField from 'material-ui/TextField';
import '../SDK/gt'
import {Card, CardMedia, CardTitle, CardText, CardHeader, CardActions} from 'material-ui/Card';


const handlerGeetest = function(result) {
    console.log(result);
};


export default class SiginupCard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            msg:'您需要要先登录才能够使用ITEN智能网球机',
            errText:'',
            phoneNumber:'',
            sms_token: '',
            geetest_challenge: '',
            geetest_validate: '',
            geetest_seccode: '',
            enable:false
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
                width: '95%',
            }, function (captchaObj) {
                // 这里可以调用验证实例 captchaObj 的实例方法
                captchaObj.appendTo('#geetest-signup');
                captchaObj.onSuccess(()=>{
                    let result = captchaObj.getValidate();
                    that.setState({
                        geetest_challenge: result.geetest_challenge,
                        geetest_validate: result.geetest_validate,
                        geetest_seccode: result.geetest_seccode
                    });
                    sms(that.state.phoneNumber, that.state.username,
                        result.geetest_challenge,
                        result.geetest_validate,
                        result.geetest_seccode).then((result)=>{
                        if(!result.flag) {
                            that.setState({errText: result.msg});
                            captchaObj.reset()
                        }
                        else{
                            that.setState({enable:true})
                        }
                    })

                })
            })
        });
    }

    handleSignup = async ()=>{
        const that =this;
        signup(this.state.username, this.state.password, this.state.phoneNumber, this.state.sms_token).then(
            (result)=>{
                if(!result.flag){
                    alert(result.msg);
                }
                else{
                    alert('注册成功！');
                    that.handleClose();
                }
            }
        )
    };

    handleClose = ()=>{
        this.props.close();
    }


    render(){
        const actions = [
            <FlatButton label="注册" primary={true} onClick={this.handleSignup} disabled={!this.state.enable}/>,
            <FlatButton label="取消" onClick={this.props.close}/>
        ]
        return(
            <Card style={{width:'90%', marginTop:'20px',marginBottom:'20px'}}>
                <CardTitle title="用户登录" subtitle="您需要先登录才能使用ITEN智能网球机"/>
                <CardText>
                {this.state.msg}
                <br/>
                <TextField
                    fullWidth={true}
                    hintText="您想要注册的用户名"
                    floatingLabelText="用户名"
                    floatingLabelFixed={true}
                    onChange={(e,v)=>{this.setState({username:v})}}
                    errorText={this.state.errText}
                />
                <TextField
                    fullWidth={true}
                    hintText="新的密码"
                    floatingLabelText="密码"
                    floatingLabelFixed={true}
                    onChange={(e,v)=>{this.setState({password:v})}}
                />
                <br/>
                {!this.state.enable?
                    <div>
                <TextField
                    fullWidth={true}
                    hintText="您的手机号码"
                    floatingLabelText="手机号码"
                    floatingLabelFixed={true}
                    onChange={(e,v)=>{this.setState({phoneNumber:v})}}
                />
                <br/>
                <p>点击下方按钮获取短信验证码</p>
                <div>
                    <div id="geetest-signup"></div>
                </div>
                    </div>
                :
                    <div>
                <br/>
                <TextField
                    fullWidth={true}
                    hintText="您收到的短信验证码"
                    floatingLabelText="短信验证码"
                    floatingLabelFixed={true}
                    onChange={(e,v)=>{this.setState({sms_token:v})}}
                />
                    </div>}
                </CardText>
                <CardActions>{actions}</CardActions>
            </Card>
        )
    }
}