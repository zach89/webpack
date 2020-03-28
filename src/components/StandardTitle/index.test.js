import React from 'react';
import { shallow } from 'enzyme';
import { StandardTitle, LeftLable, RightBtn } from './index';
/**
 * shallow
 * mount 多生命周期,setState
 * render 生成快照
 */
describe('StandardTitle compoents test', () => {
  const Children = () => 'title';
  it('StandardTitle find class&mount、shalow、render test', () => {
    const wrapper = (
      <StandardTitle>
        <Children />
      </StandardTitle>
    );
    expect(shallow(wrapper).find(Children).length).toBe(1);
    expect(shallow(wrapper).is('.bdp-standard-title')).toBe(true);
    // expect(mount(wrapper).find('.bdp-standard-title').length).toBe(1);
    // expect(toJson(render(wrapper))).toMatchSnapshot();
    // expect(render(wrapper).text()).toEqual('title');
  });
  it('LeftLable find class&shalow、render test', () => {
    const wrapper = (
      <LeftLable>
        <Children />
      </LeftLable>
    );
    expect(shallow(wrapper).find(Children).length).toBe(1);
    expect(shallow(wrapper).is('.bdp-left-lable')).toBe(true);
  });
  it('RightBtn find class&shalow、render test', () => {
    const wrapper = (
      <RightBtn>
        <Children />
      </RightBtn>
    );
    expect(shallow(wrapper).find(Children).length).toBe(1);
    expect(shallow(wrapper).is('.bdp-right-btn')).toBe(true);
  });
  // it('should render without throwing an error', function() {
  //   expect(shallow(<App />).contains(<div className="foo">Bar</div>)).toBe(true);
  // });
});
