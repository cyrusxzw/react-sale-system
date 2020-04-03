import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import styled from "styled-components";
import Amount from "./Amount";

const H1 = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  color: #1890ff;
`;

export default class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: false
    };
    this.showAmountForm = this.showAmountForm.bind(this);
  }

  componentDidMount() {
    fetch("https://sneaker-system.herokuapp.com/sneakers")
      .then(res => {
        return res.json();
      })
      .then(sneakers => {
        this.setState({
          data: sneakers
        });
      });
  }

  showAmountForm() {
    const { show } = this.state;
    this.setState({
      show: !show
    });
  }

  render() {
    let { data: sneakers } = this.state;
    sneakers = sneakers.filter(({id}) => id !== "")
    let total = "";
    sneakers.forEach(({ sold_price, buy_price }) => {
      const profit = sold_price - buy_price;
      total = +total + +profit;
    });

    const tempItems = sneakers.map(sneaker => {
      const { buy_time, sold_price, buy_price } = sneaker;
      const 利润 = sold_price - buy_price;
      const tempDate = buy_time.substring(0, 7);
      return (sneaker = {
        tempDate,
        利润
      });
    });

    let temp = {};
    tempItems.forEach(tempItem => {
      const { tempDate, 利润 } = tempItem;
      const key = tempDate;
      if (temp[key]) {
        temp[key].tempDate = tempDate;
        temp[key].利润 += 利润;
      } else {
        temp[key] = {};
        temp[key].tempDate = tempDate;
        temp[key].利润 = 利润;
      }
    });

    const reportData = [];
    for (let i in temp) {
      reportData.push(temp[i]);
    }

    //console.log(reportData);

    return (
      <div className="report-container">
        <H1 className="total-header">{`总利润：$${total}`}</H1>
        <div className={`chart-container ${this.state.show ? "hideChart" : ""}`}>
          <LineChart
            width={1000}
            height={600}
            style={{ margin: "2rem auto" }}
            data={reportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tempDate" />
            <YAxis />
            <Line type="monotone" dataKey="利润" stroke="#8884d8" />
            <Tooltip />
          </LineChart>
        </div>
        <button className="check-amount" onClick={this.showAmountForm}>
          {this.state.show ? "查看利润统计" : "查看买卖数量统计"}
        </button>
        <div
          className={`amount-container ${this.state.show ? "showAmount" : ""}`}>
          <Amount data={sneakers}></Amount>
        </div>
      </div>
    );
  }
}
