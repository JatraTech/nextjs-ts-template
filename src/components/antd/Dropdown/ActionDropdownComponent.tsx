// @ts-nocheck
"use client";

import { ChevronDown } from "lucide-react";
import { Dropdown } from "antd";

const ActionDropdownComponent = (props) => {
  const {
    menuItems = [],
    handleClick = () => {},
    menuContainerClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    icon = <ChevronDown className="w-5 h-5" strokeWidth={2} aria-hidden />,
    title = "Actions",
  } = props;
  return (
    <Dropdown
      menu={{ items: menuItems, onClick: handleClick }}
      trigger={["click"]}
      classNames={{ root: "onpoint-dropdown-overlay" }}
      getPopupContainer={(triggerNode) =>
        triggerNode.parentElement ?? document.body
      }
      popupRender={(menu) => (
        <div className={`${menuContainerClassName} custom-dropdown-menu-container`}>
          {menu}
        </div>
      )}
    >
      <span
        className={`${buttonContainerClassName} custom-dropdown-button-container inline-flex`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={`${buttonClassName} custom-dropdown-button bg-blue-800/10 dark:bg-slate-800 text-blue-800 dark:text-slate-100 text-base font-medium font-inter flex items-center gap-2 px-4 py-2.5 border border-blue-800 dark:border-slate-600 rounded-md hover:bg-blue-800/15 dark:hover:bg-slate-700 transition-colors`}
        >
          {title}
          {icon}
        </button>
      </span>
    </Dropdown>
  );
};

export default ActionDropdownComponent;
