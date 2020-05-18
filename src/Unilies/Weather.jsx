import React from "react";
import { Row, Col, Card } from "antd";
import axios from './Axios';

export default class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            weather: "",
            temperature: "",
            dayPictureUrl: "",
            data: ""
        }
    }
    componentWillMount() {
        this.getWeatherAPIData();
        this.getAusCovid();
    }

    getWeatherAPIData(){
        let city = '上海';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status == 'success'){
                let data = res.results[0].weather_data[0];
                //console.log(data)
                this.setState({
                    weather:data.weather, 
                    temperature:data.temperature,
                    dayPictureUrl: data.dayPictureUrl
                })
            }
        })
    }

    getAusCovid(){
        fetch('https://corona-api.com/countries/au').then((res) => {
            return res.json();
        }).then(({ data }) => {
            this.setState({
                data
            })
        })
    }

    render() {
        const { data } = this.state;
        let confirmed = '';
        let added = '';
        if(data){
           confirmed = data.latest_data.confirmed;
           added = data.today.confirmed;
        }

        // const { confirmed } = data.latest_data;
        // console.log(confirmed)
        const imgStyle = {
            maxWidth: '30px',
            marginLeft: '10px',
            marginRight: '10px',
        }

        return (
            <Card title="今日动态">
              <Row>
                <Col span={10}>澳洲确诊总数：{confirmed}&nbsp;&nbsp;较昨日增长：{added}</Col>
                <Col span={8}></Col>
                <Col span={6}>
                  <div style={{ textAlign: "right" }}>上海天气: <img src={this.state.dayPictureUrl} style={imgStyle}/>{this.state.weather
        }&nbsp;&nbsp;{this.state.temperature}</div>
                </Col>
              </Row>
            </Card>
          );
    }
}
