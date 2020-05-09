import React, { PureComponent } from "react";
import "../GroutStatistics/groupStatistics.css";
import Chart from "react-apexcharts";

class FollowersCharts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left: {},
      right: {},
    };
  }
  componentWillMount() {
    let leftListFolowing = this.props.leftTeam.map((item) => {
      return item.gitData.followers;
    });

    let rightListFolowing = this.props.rightTeam.map((item) => {
      return item.gitData.followers;
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
            data: leftListFolowing,
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
            data: rightListFolowing,
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

export default FollowersCharts;
