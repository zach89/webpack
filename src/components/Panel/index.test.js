import React from 'react';
import { shallow, mount } from 'enzyme';
import { Panel, PanelBody, PanelHeader, BdpContent, BdpPageContent, BtnGourp } from './index';
import toJson from 'enzyme-to-json';
describe('Panel compoents test', () => {
  const Children = () => 'children';
  it('test PanelHeader setProps', () => {
    const wrapper = <PanelHeader></PanelHeader>;
    const mountWrapper = mount(wrapper);
    mountWrapper.setProps({ title: 'title' });
    expect(mountWrapper.props().title).toEqual('title');
  });
  it('test PanelBody', () => {
    const wrapper = (
      <PanelBody>
        <Children></Children>
      </PanelBody>
    );
    expect(shallow(wrapper).find(Children).length).toBe(1);
    expect(shallow(wrapper).is('.panel-body')).toBe(true);
  });
  it('use Panel', () => {
    const wrapper = (
      <Panel>
        <PanelHeader />
        <PanelBody />
      </Panel>
    );
    expect(shallow(wrapper).is('.bdp-panel')).toBe(true);
    expect(shallow(wrapper).contains(<PanelHeader />)).toBe(true);
    expect(shallow(wrapper).contains(<PanelBody />)).toBe(true);
  });
  it('test BdpPageContent', () => {
    const wrapper = (
      <BdpPageContent>
        <Children></Children>
      </BdpPageContent>
    );
    expect(shallow(wrapper).find(Children).length).toBe(1);
    expect(shallow(wrapper).is('.bdp-page-content')).toBe(true);
  });
  it('test BdpContent', () => {
    const wrapper = (
      <BdpContent>
        <Children></Children>
      </BdpContent>
    );
    expect(shallow(wrapper).find(Children).length).toBe(1);
    expect(shallow(wrapper).is('.bdp-content')).toBe(true);
  });
  it('test BtnGourp', () => {
    const wrapper = (
      <BtnGourp>
        <Children></Children>
      </BtnGourp>
    );
    const mountWrapper = mount(wrapper);
    expect(mountWrapper.find('.bdp-btn-group').length).toBe(1);
    mountWrapper.setProps({ center: true, maxWidth: '100px' });
    expect(mountWrapper.find('.bdp-btn-group.center').length).toBe(1);
    expect(mountWrapper.props().maxWidth).toEqual('100px');
  });
});
