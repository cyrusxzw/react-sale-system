import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import styled from 'styled-components';

const H1 = styled.h1`
    text-align: center;
    font-size: 2.2rem;
    color: #1890ff;
`

export default class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch("https://sneaker-system.herokuapp.com/sneakers").then((res) => {
            return res.json();
        }).then((sneakers) => {
            this.setState({
                data: sneakers
            })

        })
    }

    render() {
        const { data: sneakers } = this.state;
        let total = '';
        sneakers.forEach(({ sold_price, buy_price }) => {
            const profit = sold_price - buy_price;
            total = +total + +profit;
        })

        const tempItems = sneakers.map((sneaker) => {
            const { buy_time, sold_price, buy_price } = sneaker;
            const 利润 = sold_price - buy_price;
            const tempDate = buy_time.substring(0, 7);
            return sneaker = {
                tempDate,
                利润
            }
        })

        var temp = {};
        for(let i in tempItems) {
             let key = tempItems[i].tempDate;
             if(temp[key]) {
                 temp[key].tempDate = tempItems[i].tempDate;
                 temp[key].利润 += tempItems[i].利润;
                 
             } else {
                 temp[key] = {};
                 temp[key].tempDate = tempItems[i].tempDate;
                 temp[key].利润 = tempItems[i].利润;
             }
         }
         let reportData = [];
         for(let k in temp){
            reportData.push(temp[k])
         }

         console.log(reportData);

        return (
            <div>
                <H1 className="total-header">
                    {`总利润：$${total}`}
                </H1>
                <LineChart
                    width={1000}
                    height={600}
                    style={{margin:"2rem auto"}}
                    data={reportData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tempDate" />
                    <YAxis />
                    <Line type="monotone" dataKey="利润" stroke="#8884d8"/>
                    <Tooltip />
                </LineChart>
            </div>
        )
    }
}
