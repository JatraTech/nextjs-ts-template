// @ts-nocheck
import { RightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

const CollapseComponent2 = ({
  defaultActiveKey = ["1"],
  panels = [],
  collapseProps = {},
  panelStyle = {
    background: "#FFF",
    borderRadius: 4,
    marginBottom: 10,
    border: 0,
    overflow: "hidden",
  },
  expandIconStyle = "!text-2xl !text-green-500",
}) => {
  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      bordered={false}
      expandIconPosition="end"
      expandIcon={({ isActive }) => (
        <RightOutlined className={expandIconStyle} rotate={isActive ? 90 : -90} />
      )}
      {...collapseProps}
      items={panels.map(({ key, header, extra, content }, index) => ({
        key: key ?? String(index),
        label: header,
        extra,
        style: panelStyle,
        className: "text-xl font-inter font-bold text-shark-950 -ml-5",
        children: <div className="-mt-3">{content}</div>,
      }))}
    />
  );
};

export default CollapseComponent2;
