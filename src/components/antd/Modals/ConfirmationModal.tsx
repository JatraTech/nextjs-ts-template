// @ts-nocheck
"use client";

import ButtonFilled from "@/components/shared/Buttons/ButtonFilled";
import ButtonOutlined from "@/components/shared/Buttons/ButtonOutlined";
import { OverlayHeaderBar } from "@/components/shared/OverlayChrome";
import { Modal } from "antd";
import { useId } from "react";
import "@/styles/antd.css";

const ConfirmationModal = ({
  isModalOpen,
  setModalHandler = () => {},
  width = 480,
  bodyStyle = null,
  footer = null,
  title = "Do you want to delete this?",
  controller = true,
  centered = true,
  mask = true,
  destroyOnHidden = false,
  closeIcon = true,
  modalContainerClassName,
  buttonContainerClassName,
  titleClassName,
  onClose,
  cancelButtonTitle = "Cancel",
  cancelButtonClassName = "",
  onCancel = () => {},
  confirmButtonTitle = "Confirm",
  confirmButtonClassName = "",
  onConfirm = () => {},
  loading = false,
}) => {
  const titleId = useId();
  const messageId = useId();

  const handleCancel = () => {
    if (controller) {
      setModalHandler("");
    } else {
      setModalHandler(false);
    }
    if (onClose) onClose();
    if (onCancel) onCancel();
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
      aria-labelledby={titleId}
      aria-describedby={messageId}
    >
      <OverlayHeaderBar
        title="Confirm"
        titleId={titleId}
        onClose={handleCancel}
        showClose={Boolean(closeIcon)}
      />
      <div
        className={`onpoint-modal-body ${modalContainerClassName ?? ""} flex flex-col gap-8 px-6 py-8`}
      >
        <p
          id={messageId}
          className={`m-0 text-xl font-semibold text-slate-800 dark:text-slate-100 font-inter ${titleClassName}`}
        >
          {title}
        </p>
        <div
          className={`${buttonContainerClassName} flex flex-wrap items-center justify-end gap-3`}
        >
          {!loading && (
            <ButtonOutlined
              text={cancelButtonTitle}
              className={`!text-base !py-2.5 !px-5 ${cancelButtonClassName}`}
              onClick={handleCancel}
            />
          )}
          <ButtonFilled
            text={confirmButtonTitle}
            className={`!text-base !py-2.5 !px-5 ${confirmButtonClassName}`}
            onClick={onConfirm}
            loading={loading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
