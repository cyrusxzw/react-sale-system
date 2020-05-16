import React from "react";
import { Card, Row, Col, Button } from "antd";

export default class SearchBasedOnMonth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const months = [
      "一月份",
      "二月份",
      "三月份",
      "四月份",
      "五月份",
      "六月份",
      "七月份",
      "八月份",
      "九月份",
      "十月份",
      "十一月份",
      "十二月份",
    ];

    const { onMonthClick } = this.props;
    return (
      <Card title="按月份搜索">
        <Row>
          {months.map((month, index) => {
            return (
              <Col span={2} key={index}>
                <Button
                  onClick={() => {
                    onMonthClick(index);
                  }}>
                  {month}
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card>
    );
  }
}
