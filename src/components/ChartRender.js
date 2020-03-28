import React from 'react';
import echarts from 'echarts';

import './index.less';

class ChartRender extends React.Component {
  state = {
    myChart: '',
  };

  componentDidMount() {
    const { charts } = this;
    const myChart = echarts.init(charts);
    this.setState({
      myChart,
    });
  }

  componentDidUpdate() {
    const { option } = this.props;
    if (option) {
      this.update();
    }
  }

  update = () => {
    const { myChart } = this.state;
    const { option } = this.props;
    myChart.setOption(option, true);
    myChart.resize();
  };

  render() {
    return (
      <div
        ref={el => {
          this.charts = el;
        }}
        className="z-charts"
      />
    );
  }
}

export default ChartRender;
