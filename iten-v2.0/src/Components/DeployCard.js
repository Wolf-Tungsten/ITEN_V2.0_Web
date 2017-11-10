import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText, CardActions, CardHeader} from 'material-ui/Card';
import * as fetch from '../Functions/Fetch'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Step,Stepper,StepButton,StepContent} from 'material-ui/Stepper';
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
            trainId:'',
            stepIndex:0
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
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex < 3) {
            this.setState({stepIndex: stepIndex + 1});
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions(step) {
        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label="下一步"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="上一步"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render(){
        //展开训练列表和网球机列表
        let machineList = this.state.machineList.slice(0);
        let trainModeList = this.state.trainModeList.slice(0);
        let counter = 0;
        machineList = machineList.map((i)=>{return <MenuItem key={counter} value={counter++} primaryText={i}/>});
        counter = 0;
        trainModeList = trainModeList.map((i)=>{
            return <MenuItem key={counter} value={counter++} primaryText={i.train_name}/>
        });

        return(
            <Card style={{width:'90%',marginTop:'14px', marginBottom:'23px'}}
                  expandable={true}>
                <CardTitle
                    title="训练任务部署"
                    subtitle="请根据需要选择要使用的网球机、训练模式以及设置训练数量"
                    actAsExpander={true}
                />
                <CardText
                    expandable={true}>
                    <Stepper
                        activeStep={this.state.stepIndex}
                        linear={true}
                        orientation="vertical"
                    >
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 0})}>
                                选择可用网球机
                            </StepButton>
                            <StepContent>
                                <SelectField
                                    floatingLabelText="选择网球机"
                                    value={this.state.machineValue}
                                    onChange={this.handleChooseMachine}
                                >
                                    {machineList}
                                </SelectField>
                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 1})}>
                                选择训练模式
                            </StepButton>
                            <StepContent>
                                <SelectField
                                    floatingLabelText="选择训练模式"
                                    value={this.state.trainValue}
                                    onChange={this.handleChooseTrain}
                                >
                                    {trainModeList}
                                </SelectField>
                                {this.renderStepActions(1)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 2})}>
                                设置训练数量
                            </StepButton>
                            <StepContent>
                                <TextField
                                    hintText="训练数量"
                                    floatingLabelText="输入训练数量"
                                    floatingLabelFixed={true}
                                    onChange={(e,v)=>{this.setState({trainAmount:parseInt(v)})}}
                                />
                                {this.renderStepActions(2)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 3})}>
                                开始训练！
                            </StepButton>
                            <StepContent>
                                <RaisedButton primary={true} label="开始训练！" onClick={this.handleDeploy} />
                            </StepContent>
                        </Step>
                    </Stepper>


                    <br />

                </CardText>
                <CardActions>

                </CardActions>
            </Card>
        )
    }
}