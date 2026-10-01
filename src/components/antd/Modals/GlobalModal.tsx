// @ts-nocheck
"use client";

import { OverlayBody, OverlayHeaderBar } from "@/components/shared/OverlayChrome";
import { Modal } from "antd";
import { useId } from "react";
import "@/styles/antd.css";

const GlobalModal = ({
  isModalOpen,
  setModalHandler = () => {},
  children,
  width = 670,
  bodyStyle = null,
  footer = null,
  title = "Title",
  controller = true,
  centered = true,
  mask = true,
  destroyOnHidden = false,
  closeIcon = true,
  modalContainerClassName,
  titleClassName,
  titleContentClassName,
  onClose,
}) => {
  const titleId = useId();

  const handleCancel = () => {
    if (controller) {
      setModalHandler("");
    } else {
      setModalHandler(false);
    }
    if (onClose) onClose();
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      centered={centered}
      width={width}
      styles={{ body: bodyStyle ?? { padding: 0 } }}
      footer={footer}
      className="onpoint-global-modal font-inter"
      maskClosable={mask}
      destroyOnHidden={destroyOnHidden}
      closeIcon={null}
      aria-labelledby={title ? titleId : undefined}
    >
      <OverlayHeaderBar
        title={title}
        titleId={titleId}
        onClose={handleCancel}
        showClose={Boolean(closeIcon)}
        titleClassName={titleClassName}
        barClassName={titleContentClassName}
      />
      <div className={`onpoint-modal-body ${modalContainerClassName ?? ""}`}>
        {children ?? (
          <OverlayBody>Modal body content.</OverlayBody>
        )}
      </div>
    </Modal>
  );
};

export default GlobalModal;
