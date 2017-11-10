import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText, CardHeader} from 'material-ui/Card';
import * as fetch from '../Functions/Fetch'

export default class VideoCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            index:0,
            videoList:[]
        };

    }

    componentDidMount(){
        let videoList = fetch.getVideoList();
        this.setState({videoList:videoList});
    }

    //实现循环播放
    next = ()=>{
        let currentIndex = this.state.index;
        if(currentIndex < this.state.videoList.length)
        {
            this.setState({index:currentIndex+1})
        }
        else
        {
            this.setState({index:0})
        }
    }

    render(){

        return(
            <Card
                style={{width:'90%'}}

            >
                <CardTitle
                    title="精彩镜头回放"
                    subtitle="纪录您在球场上的飒爽英姿"

                />
                <CardMedia

                >
                    <video style={{width:'320px',height:'240px'}} src={this.state.videoList[this.state.index]} onEnded={this.next}/>
                </CardMedia>

            </Card>
        )
    }
}