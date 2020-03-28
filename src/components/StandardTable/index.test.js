import React from 'react';
import StandradTable from './index';
import { shallow, mount } from 'enzyme';

describe('StandradTable components test', () => {
  it('StandradTable columns needTotal/ellipsis/render test', () => {
    const mountWrapper = mount(
      <StandradTable data={{ list: [], pagination: false }} columns={[]} />
    );

    mountWrapper.setProps({ columns: [{ needTotal: true }], selectedRows: [] });
    expect(mountWrapper.state().needTotalList.length).toBe(1);
    mountWrapper.setProps({ columns: [{ needTotal: false }], selectedRows: [] });
    expect(mountWrapper.state().needTotalList.length).toBe(0);

    mountWrapper.setProps({
      data: { list: [{ key: 123, name: '123' }], pagination: false },
    });
    const columns = [{ dataIndex: 'name', ellipsis: 1, render: text => text }];
    mountWrapper.setProps({
      columns,
    });
    expect(mountWrapper.props().columns).toEqual(columns);
    mountWrapper.setProps({
      columns: [{ dataIndex: 'name', ellipsis: 1 }],
    });
    expect(mountWrapper.props().columns).toEqual([{ dataIndex: 'name', ellipsis: 1 }]);
  });
  it('StandradTable rowKey test', () => {
    const mountWrapper = mount(
      <StandradTable
        data={{ list: [{ key: 1 }], pagination: { current: 1, pageSize: 10 } }}
        columns={[]}
      />
    );
    mountWrapper.setProps({ rowKey: 'key' });
    expect(mountWrapper.props().rowKey).toBe('key');
  });
  it('cleanSelectedKeys test', () => {
    const mountWrapper = mount(
      <StandradTable data={{ list: [], pagination: false }} columns={[]} />
    );
    const { cleanSelectedKeys, handleRowSelectChange } = mountWrapper.instance();
    const spy = jest.fn();
    mountWrapper.instance().handleRowSelectChange = (selectedRowKeys, selectedRows) => {
      handleRowSelectChange(selectedRowKeys, selectedRows);
      spy();
    };
    cleanSelectedKeys();
    expect(spy).toBeCalled();
  });
  it('onSelectRow test', () => {
    const onSelectRow = jest.fn();
    const mountWrapper = mount(
      <StandradTable data={{ list: [], pagination: false }} columns={[]} />
    );
    mountWrapper.setProps({
      columns: [{ needTotal: true }],
      selectedRows: [],
      onSelectRow,
    });
    mountWrapper.instance().handleRowSelectChange(0, [{ dataIndex: 1, dataIndex: 2 }]);
    expect(onSelectRow).toHaveBeenCalled();
    const { selectedRowKeys, needTotalList } = mountWrapper.state();
    expect(needTotalList.length).toBe(1);
    expect(selectedRowKeys).toBe(0);
  });
  it('onchange test', () => {
    const onChange = jest.fn();
    const mountWrapper = mount(
      <StandradTable data={{ list: [], pagination: false }} columns={[]} onChange={onChange} />
    );
    mountWrapper.instance().handleTableChange({}, {}, {});
    expect(onChange).toHaveBeenCalled();
  });
});
