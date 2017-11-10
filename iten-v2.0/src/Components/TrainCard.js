import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText, CardActions, CardHeader} from 'material-ui/Card';
import * as fetch from '../Functions/Fetch'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

export default class TrainCard extends React.Component{
    constructor(props){
        super(props)

    }

    handlePause = ()=>{
        if(this.props.machineState === 'working')
        {
            fetch.pause();
        }
        else if(this.props.machineState === 'pause')
        {
            fetch.resume();
        }
    };

     handleStop = () => {
         fetch.stop();
     };

    render(){
        //转化文字
        let cardTitle = this.props.trainName;
        let cardSubtitle = '';
        let trainCount = this.props.trainCount;
        let buttonTitle = '暂停训练';
        switch(this.props.machineState)
        {
            case 'deploying':
                cardSubtitle = '训练任务正在部署，请稍候';
                trainCount = 0;
                break;
            case 'working':
                cardSubtitle = '正在进行训练...';
                buttonTitle = '暂停训练';
                break;
            case 'pause':
                cardSubtitle = '训练暂停';
                buttonTitle = '继续训练';
                break;
            default:
                cardSubtitle = '请稍候';
        }

        return(
            <Card style={{width:'90%',marginTop:'14px', marginBottom:'23px'}}>
                <CardTitle
                    subtitle={cardTitle}
                    title={cardSubtitle}
                />
                <CardText>
                    <div className="count-amount">
                        <div className="count-or-amount">
                            <p className="count-hint">当前数量</p>
                            <p className="count-number">{trainCount?trainCount:'0'}</p>
                        </div>
                        <div className="line"></div>
                        <div className="count-or-amount">
                            <p className="count-hint">训练总数</p>
                            <p className="count-number">{parseInt(this.props.trainAmount)}</p>
                        </div>
                    </div>
                    <LinearProgress mode="determinate" value={trainCount} min={0} max={this.props.trainAmount} />

                </CardText>
                <CardActions>
                    <div className="train-button">
                        <RaisedButton style={{marginLeft:'17px',marginRight:'17px'}} label={buttonTitle} onClick={this.handlePause} />
                        <RaisedButton style={{marginLeft:'17px',marginRight:'17px'}} label="停止训练" primary={true} onClick={this.handleStop} />
                    </div>
                </CardActions>
            </Card>
        )
    }
}