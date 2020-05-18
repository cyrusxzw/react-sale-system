import React from "react";
import { Row, Col, Card } from "antd";

export default class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            weather: "",
            temperature: "",
            imgUrl: "",
            data: ""
        }
    }
    componentWillMount() {
        this.getWeatherAPIData();
        this.getAusCovid();
    }

    getWeatherAPIData(){
        let city = '36';
        fetch('https://sapi.k780.com/?app=weather.today&weaid='+city+'&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json').then((res) => {
            return res.json();
        }).then(({ result }) => {
            console.log(result);
            this.setState({
                weather: result.weather,
                temperature: `${result.temp_low}℃ - ${result.temp_high}℃`,
                imgUrl: result.weather_icon
            })
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
                  <div style={{ textAlign: "right" }}>上海天气: <img src={this.state.imgUrl} style={imgStyle}/>{this.state.weather
        }&nbsp;&nbsp;{this.state.temperature}</div>
                </Col>
              </Row>
            </Card>
          );
    }
}
