import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class Amount extends React.Component {

  render() {
    const { data } = this.props;
    const newList = [];
    const tempItems = data.map(sneaker => {
      const { buy_time, sold_time } = sneaker;
      const tempBuyDate = buy_time.substring(0, 7);
      const tempSoldDate = sold_time.substring(0, 7);
      return (sneaker = {
        tempBuyDate,
        tempSoldDate
      });
    });

    const groupBy =  ( array , f ) => {
      let groups = {};
      array.forEach( function( o ) {
          let group = JSON.stringify( f(o) );
          groups[group] = groups[group] || [];
          groups[group].push( o );
      });
      return Object.keys(groups).map( function( group ) {
          return groups[group];
      });
    }

    if(tempItems.length !==0 ) {
      const items = tempItems;
      let sorted = groupBy(items, function(item){
        return [item.tempBuyDate];
      });

      //console.log(sorted);
      sorted.forEach((e, index) => {
        const totalPurchaseAmount = e.length;
       
        const filtered = e.filter((i) => {
          const soldDate = i.tempSoldDate;
          if(soldDate !== "") {
            return true;
          } 
        })
        const totalSoldAmount = filtered.length;
        const detail = {
          "month" : e[0].tempBuyDate,
          "买入": totalPurchaseAmount,
          "卖出": totalSoldAmount
        }
        newList.push(detail);
        
      })
    }
    return (
      <BarChart
        width={1000}
        height={600}
        data={newList}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="买入" fill="#8884d8" />
        <Bar dataKey="卖出" fill="#82ca9d" />
      </BarChart>
    );
  }
}
