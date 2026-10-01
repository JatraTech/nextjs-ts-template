// @ts-nocheck
"use client";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

const AccordionCollapseComponent1 = ({
  inActiveIcon = <PlusOutlined />,
  activeIcon = <MinusOutlined />,
  header = "Dummy Header",
  content = "Dummy Content",
  contentKey = "1",
  collapseContainerClassName = "",
  expandIconPosition = "end",
  setShowExtraIcon = () => {},
  showArrow = true,
}) => {
  return (
    <Collapse
      expandIconPosition={expandIconPosition}
      expandIcon={({ isActive }) => (isActive ? activeIcon : inActiveIcon)}
      onChange={(value) => {
        if (setShowExtraIcon) {
          setShowExtraIcon(value);
        }
      }}
      showArrow={showArrow}
      className={`custom-collapse-container w-full !rounded-[2px] !border-shark-300 ${collapseContainerClassName}`}
      items={[
        {
          key: contentKey,
          label: header,
          children: content,
          className: "custom-collapse-panel",
        },
      ]}
    />
  );
};

export default AccordionCollapseComponent1;
