import React from 'react';
import ChartRender from './ChartRender';
import { mount } from 'enzyme';

describe('echarts base render test', () => {
  it('test didmount', () => {
    const mountWrapper = mount(<ChartRender></ChartRender>);
    mountWrapper.setProps({ option: {} });
  });
});
