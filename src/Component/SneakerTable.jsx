import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default class SneakerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "商品",
          field: "name",
          editComponent: props => (
            <input
              type="text"
              value={props.value || ""}
              onChange={e => props.onChange(e.target.value)}
            />
          )
        },
        { title: "尺码", field: "size" },
        { title: "买入时间", field: "buy_time", type: "date" },
        { title: "卖出时间", field: "sold_time", type: "date" },
        { title: "买入价", field: "buy_price", type: "numeric" },
        { title: "卖出价", field: "sold_price", type: "numeric" },
        { title: "买家", field: "buyer" },
        { title: "利润", field: "profit", type: "numeric" }
      ],
      data: []
    };
  }

  componentDidMount() {
    fetch("https://sneaker-system.herokuapp.com/sneakers")
      .then(res => {
        return res.json();
      })
      .then(sneakers => {
        const newSneakers = sneakers.map(sneaker => {
          const { buy_price, sold_price } = sneaker;
          const profit = sold_price - buy_price;
          if (buy_price) {
            return (sneaker = {
              ...sneaker,
              profit
            });
          } else {
            return sneaker;
          }
        });

        //console.log(newSneakers);
        this.setState({
          data: newSneakers
        });
      });
  }

  render() {
    return (
      <MaterialTable
        title="统计表"
        options={{
          exportButton: true
        }}
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = Array.from(this.state.data);
                  const originalData = {
                    name: "",
                    size: "",
                    buy_time: "",
                    sold_time: "",
                    buy_price: "",
                    sold_price: "",
                    buyer: ""
                  };
                  const sentData = {
                    ...originalData,
                    ...newData
                  };

                  axios
                    .post(
                      "https://sneaker-system.herokuapp.com/sneakers",
                      sentData
                    )
                    .then(() => {
                      const { sold_price, buy_price } = newData;
                      const profit = sold_price - buy_price;
                      if (sold_price && buy_price) {
                        newData = {
                          ...newData,
                          profit: profit
                        };
                      }

                      //console.log(newData);
                      data.push(newData);
                      this.setState({ data }, () => resolve());
                    })
                    .catch(() => {
                      alert("出错啦！快去找许增威！");
                    });
                }
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = Array.from(this.state.data);
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  const { id } = oldData;
                  delete newData["profit"];
                  let { buy_time, sold_time } = newData;
                  if (buy_time == null) {
                    buy_time = "";
                    newData = {
                      ...newData,
                      buy_time
                    };
                  }
                  if (sold_time == null) {
                    sold_time = "";
                    newData = {
                      ...newData,
                      sold_time
                    };
                  }
                  //console.log(buy_time);
                  if (!id) {
                    fetch("https://sneaker-system.herokuapp.com/sneakers")
                      .then(res => {
                        return res.json();
                      })
                      .then(sneakers => {
                        const indexWithId = sneakers.indexOf(oldData);
                        const dataWithId = sneakers.splice(indexWithId, 1);

                        const { id } = dataWithId[0];
                        axios
                          .patch(
                            `https://sneaker-system.herokuapp.com/sneakers/${id}`,
                            newData
                          )
                          .then(() => {
                            const { buy_price, sold_price } = newData;
                            const newProfit = sold_price - buy_price;
                            newData = {
                              ...newData,
                              profit: newProfit
                            };

                            const { id: newDataId } = newData;
                            data = data.map(sneaker => {
                              const { id } = sneaker;
                              if (id == newDataId) {
                                return (sneaker = newData);
                              } else {
                                return sneaker;
                              }
                            });
                            //console.log(dataForProfitUsing);
                            this.setState({ data }, () => resolve());
                          })
                          .catch(() => {
                            alert("出错啦！快去找许增威！");
                          });
                      });
                  } else {
                    axios
                      .patch(
                        `https://sneaker-system.herokuapp.com/sneakers/${id}`,
                        newData
                      )
                      .then(() => {
                        const { buy_price, sold_price } = newData;
                        const newProfit = sold_price - buy_price;
                        newData = {
                          ...newData,
                          profit: newProfit
                        };

                        const { id: newDataId } = newData;
                        data = data.map(sneaker => {
                          const { id } = sneaker;
                          if (id == newDataId) {
                            return (sneaker = newData);
                          } else {
                            return sneaker;
                          }
                        });
                        //console.log(dataForProfitUsing);
                        this.setState({ data }, () => resolve());
                      })
                      .catch(() => {
                        alert("出错啦！快去找许增威！");
                      });
                  }
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = Array.from(this.state.data);
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  const { id } = oldData;
                  if (!id) {
                    fetch("https://sneaker-system.herokuapp.com/sneakers")
                      .then(res => {
                        return res.json();
                      })
                      .then(sneakers => {
                        const indexWithId = sneakers.indexOf(oldData);
                        const dataWithId = sneakers.splice(indexWithId, 1);

                        const { id } = dataWithId[0];

                        axios
                          .delete(
                            `https://sneaker-system.herokuapp.com/sneakers/${id}`
                          )
                          .then(() => {
                            this.setState({ data }, () => resolve());
                          })
                          .catch(() => {
                            alert("出错啦！快去找许增威！");
                          });
                      });
                  } else {
                    axios
                      .delete(
                        `https://sneaker-system.herokuapp.com/sneakers/${id}`
                      )
                      .then(() => {
                        this.setState({ data }, () => resolve());
                      })
                      .catch(() => {
                        alert("出错啦！快去找许增威！");
                      });
                  }
                }
                resolve();
              }, 1000);
            })
        }}
      />
    );
  }
}
