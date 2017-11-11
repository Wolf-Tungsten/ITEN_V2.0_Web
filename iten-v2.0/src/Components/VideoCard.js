import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText, CardHeader, CardActions} from 'material-ui/Card';
import * as fetch from '../Functions/Fetch'
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import FlatButton from 'material-ui/FlatButton';

export default class VideoCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            index:0,
            videoList:[]
        };

    }

    async componentWillMount(){
        let videoList = await fetch.getVideoList();
        this.setState({videoList:videoList});
    }

    refresh = async ()=>{
        window.location.reload();
    }

    //实现循环播放
    next = ()=>{
        let currentIndex = this.state.index;
        if(currentIndex < this.state.videoList.length-1)
        {
            this.setState({index:currentIndex+1})
        }
        else
        {
            this.setState({index:0})
        }
    }

    //实现循环播放
    download = ()=>{
        window.open(this.state.videoList[this.state.index]);
    }

    render(){
        let source0 = this.state.videoList.map((src)=>{
            return <source src={this.state.videoList[0]}/>
        });
        let source1 = this.state.videoList.map((src)=>{
            return <source src={this.state.videoList[1]}/>
        });
        let source2 = this.state.videoList.map((src)=>{
            return <source src={this.state.videoList[2]}/>
        });
        let source3 = this.state.videoList.map((src)=>{
            return <source src={this.state.videoList[3]}/>
        });
        let source4 = this.state.videoList.map((src)=>{
            return <source src={this.state.videoList[4]}/>
        });
        return(
            <Card
                style={{width:'90%'}}
            >
                <CardTitle
                    title="精彩镜头回放"
                    subtitle="纪录您在球场上的飒爽英姿"
                />
                <CardMedia>
                    {this.state.index === 0?
                    <Player>
                        {source0}
                    </Player>:<div/>}
                    {this.state.index === 1?
                        <Player>
                            {source1}
                        </Player>:<div/>}
                    {this.state.index === 2?
                        <Player>
                            {source2}
                        </Player>:<div/>}
                    {this.state.index === 3?
                        <Player>
                            {source3}
                        </Player>:<div/>}
                    {this.state.index === 4?
                        <Player>
                            {source4}
                        </Player>:<div/>}

                </CardMedia>
                <CardActions>
                    <FlatButton label="下一段" onClick={this.next}/>
                    <FlatButton label="保存到本地" onClick={this.download}/>
                    <FlatButton label="刷新视频" onClick={this.refresh}/>
                </CardActions>
            </Card>
        )
    }
}