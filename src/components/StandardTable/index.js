import React, { PureComponent } from 'react';
import { Table, Tooltip } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      this.setState({
        selectedRowKeys: [],
        needTotalList,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { needTotalList: list } = this.state;
    let needTotalList = [...list];
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));

    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  // handleRowKey = (arr, pagination = {}) => {
  //   if (pagination) {
  //     const { current = 1, pageSize = 10 } = pagination;
  //     (arr || []).forEach((d, i) => {
  //       arr[i].index = (current - 1) * pageSize + i + 1;
  //     });
  //   }
  //   return arr;
  // };

  render() {
    const { selectedRowKeys } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      rowKey,
      scroll = {},
      selectedRows,
      bordered = true,
    } = this.props;
    const paginationProps =
      list && list.length > 0 && pagination // 支持不显示翻页器
        ? {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
            showTotal: () => `总共${pagination.total}条`,
          }
        : false;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
    // this.handleRowKey(list, pagination);

    const initialedColumns = columns.map(column => ({
      ...column,
      render:
        column.ellipsis && !columns.render // 支持通过在 columns 数组中添加 ellipsis 属性给字段增加 tooltips
          ? text => (
              <Tooltip title={text} placement="topLeft">
                {text}
              </Tooltip>
            )
          : column.render,
    }));

    return (
      <div className={styles.standardTable}>
        {/* <div className={styles.tableAlert}>
          { this.props.selectedRows ? (
            <Alert
              message={(
                <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                  {
                  needTotalList.map(item => (
                    <span style={{ marginLeft: 8 }} key={item.dataIndex}>{item.title}总计&nbsp;
                      <span style={{ fontWeight: 600 }}>
                        {item.render ? item.render(item.total) : item.total}
                      </span>
                    </span>
                    )
                  )
                }
                  <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
                </Fragment>
            )}
              type="info"
              showIcon
            />
          ) : ''}
        </div> */}
        <Table
          className="sfui"
          bordered={bordered}
          loading={loading}
          rowKey={record => (rowKey ? record[rowKey] : record.key)}
          rowSelection={selectedRows ? rowSelection : null}
          dataSource={list}
          columns={initialedColumns}
          scroll={{ ...scroll }}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
