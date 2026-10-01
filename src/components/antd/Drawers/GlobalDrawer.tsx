// @ts-nocheck
"use client";

import { OverlayBody, OverlayHeaderBar } from "@/components/shared/OverlayChrome";
import { Button, Drawer } from "antd";
import { useId } from "react";
import "@/styles/antd.css";

const GlobalDrawer = ({
  isDrawerOpen,
  setDrawerHandler = () => {},
  children,
  width = 480,
  bodyStyle = null,
  footer = null,
  title = "Drawer Title",
  controller = true,
  placement = "right",
  destroyOnHidden = false,
  closeIcon = true,
  drawerContainerClassName = "",
  titleClassName,
  titleContentClassName,
  onReload,
  loading = false,
}) => {
  const titleId = useId();

  const handleClose = () => {
    if (controller) {
      setDrawerHandler(false);
      return;
    }
    setDrawerHandler("");
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={handleClose}
      width={width}
      styles={{ body: bodyStyle ?? { padding: 0 } }}
      footer={footer}
      destroyOnHidden={destroyOnHidden}
      placement={placement}
      closable={false}
      className="onpoint-global-drawer font-inter"
      aria-labelledby={titleId}
    >
      <div
        className={`onpoint-drawer-body flex min-h-full flex-col ${drawerContainerClassName ?? ""}`}
      >
        <OverlayHeaderBar
          title={title}
          titleId={titleId}
          onClose={handleClose}
          showClose={Boolean(closeIcon)}
          titleClassName={titleClassName}
          barClassName={`!rounded-none ${titleContentClassName}`}
        />
        <OverlayBody className="flex-1">
          {children}
          {onReload && !loading ? (
            <Button
              type="primary"
              className="!mt-4 !bg-neutral-950 !font-inter"
              onClick={onReload}
              loading={loading}
            >
              Reload
            </Button>
          ) : null}
        </OverlayBody>
      </div>
    </Drawer>
  );
};

export default GlobalDrawer;
