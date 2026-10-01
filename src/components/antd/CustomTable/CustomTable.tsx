// @ts-nocheck
import React, { useState } from "react";
import { Table } from "antd";
import "@/styles/antd.css";

//  <CustomTable
//    columns={columns}
//    data={savedSearchList}
//    className="deal-hunter-saved-search-table"
//    pageSize={5}
//    currentPage={currentPage}
//    setCurrentPage={setCurrentPage}
//    total={savedSearchCount?.total}
//    loading={loading}
//  />;

const CustomTable = ({
  columns,
  data,
  className = "",
  customStyles,
  loading = false,
  checkboxShow = false
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Handle selection changes
  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
    console.log("Selected Row Keys:", selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="flex flex-col gap-4 font-inter">
      <Table
        size={className === "sku-matching-table" ? "small" : ""}
        rowKey={(data) => data.id}
        columns={columns}
        className={`custom-table ${className} ${customStyles}`}
        dataSource={data}
        pagination={false}
        scroll={{ x: "max-content" }}
        loading={loading}
        rowSelection={checkboxShow && rowSelection} // Add rowSelection for checkboxes
        rowClassName={"!border !border-shark-950"}
      />
    </div>
  );
};

export default CustomTable;