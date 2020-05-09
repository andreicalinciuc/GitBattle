import React, { PureComponent } from "react";
import "../GroutStatistics/groupStatistics.css";
import Chart from "react-apexcharts";

class DaysCharts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left: {},
      right: {},
    };
  }
  days_between(date1, date2) {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    return Math.round(differenceMs / ONE_DAY);
  }
  componentWillMount() {
    let leftListDays = this.props.leftTeam.map((item) => {
      return this.days_between(new Date(item.gitData.created_at), new Date());
    });

    let rightListDays = this.props.rightTeam.map((item) => {
      return this.days_between(new Date(item.gitData.created_at), new Date());
    });
    this.setState({
      left: {
        options: {
          xaxis: {
            categories: this.props.leftListName,
          },
        },
        series: [
          {
            name: "Left Team",
            data: leftListDays,
          },
        ],
      },
      right: {
        options: {
          xaxis: {
            categories: this.props.rightListName,
          },
        },
        series: [
          {
            name: "Right Team",
            data: rightListDays,
          },
        ],
      },
    });
  }
  render() {
    return (
      <div className="chart">
        <p> {this.props.title}</p>
        <div className="chart-section">
          <Chart
            options={this.state.left.options}
            series={this.state.left.series}
            type="bar"
            width={500}
            height={320}
          />
          <Chart
            options={this.state.right.options}
            series={this.state.right.series}
            type="bar"
            width={500}
            height={320}
          />
        </div>
      </div>
    );
  }
}

export default DaysCharts;
