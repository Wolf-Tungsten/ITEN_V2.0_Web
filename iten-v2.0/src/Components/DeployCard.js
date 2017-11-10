import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText, CardActions, CardHeader} from 'material-ui/Card';
import * as fetch from '../Functions/Fetch'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class DeployCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            machineList:[],
            trainModeList:[],
            trainAmount:0,
            trainCount:0,
            machineValue:0,
            trainValue:0,
            machineId:'',
            trainId:''
        };



    }

    componentDidMount(){
        this.refresh = setInterval(async()=>{
            let machineList = await fetch.getAvailableMachine();
            let trainModeList = await fetch.getTrainModeList();
            this.setState({
                machineList:machineList,
                trainModeList:trainModeList
            });
            if(this.state.trainId === ''){
                this.setState({trainId:trainModeList[0]._id})
            }
            if(this.state.machineId === ''){
                this.setState({machineId:machineList[0]})
            }
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.refresh);
    }

    handleChooseMachine = (e,number) => {
        this.setState({machineValue:number,
        machineId:this.state.machineList[number]})
    };

    handleChooseTrain = (e,number) => {
        this.setState({trainValue:number,
            trainId:this.state.trainModeList[number]._id})
    };

    handleDeploy = () => {
        if(this.state.trainId !== '' && this.state.machineId !== '') {
            fetch.deploy(this.state.machineId, this.state.trainId, this.state.trainAmount);
        }
    }

    render(){
        //展开训练列表和网球机列表
        let machineList = this.state.machineList.slice(0);
        let trainModeList = this.state.trainModeList.slice(0);
        let counter = 0;
        machineList = machineList.map((i)=>{return <MenuItem value={counter++} primaryText={i}/>});
        counter = 0;
        trainModeList = trainModeList.map((i)=>{
            return <MenuItem value={counter++} primaryText={i.train_name}/>
        });

        return(
            <Card style={{width:'90%',marginTop:'14px', marginBottom:'23px'}}>
                <CardHeader
                    title="训练任务部署"
                />
                <CardText>
                    <SelectField
                        floatingLabelText="选择网球机"
                        value={this.state.machineValue}
                        onChange={this.handleChooseMachine}
                    >
                        {machineList}
                    </SelectField>
                    <br />
                    <SelectField
                        floatingLabelText="选择训练模式"
                        value={this.state.trainValue}
                        onChange={this.handleChooseTrain}
                    >
                        {trainModeList}
                    </SelectField>
                    <br />
                    <TextField
                        hintText="训练数量"
                        floatingLabelText="输入训练数量"
                        floatingLabelFixed={true}
                        onChange={(e,v)=>{this.setState({trainAmount:parseInt(v)})}}
                    />
                </CardText>
                <CardActions>
                    <FlatButton label="开始训练！" onClick={this.handleDeploy} />
                </CardActions>
            </Card>
        )
    }
}