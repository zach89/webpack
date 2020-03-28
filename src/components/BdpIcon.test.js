import React from 'react';
import BdpIcon from './BdpIcon';
import { mount } from 'enzyme';

describe('BdpIcon components test', () => {
  it('BdpIcon mount test', () => {
    const mountWrapper = mount(<BdpIcon />);
    expect(mountWrapper.find('.bdpicon.bdpicon-md').length).toBe(1);
  });
});
