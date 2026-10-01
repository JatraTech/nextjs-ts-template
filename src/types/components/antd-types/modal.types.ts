import type { CSSProperties, ReactNode } from "react";

export type ModalHandler = string | boolean;

export interface GlobalModalProps {
  isModalOpen: boolean;
  setModalHandler?: (value: ModalHandler) => void;
  children?: ReactNode;
  width?: number;
  bodyStyle?: CSSProperties | null;
  footer?: ReactNode;
  title?: ReactNode;
  controller?: boolean;
  centered?: boolean;
  mask?: boolean;
  destroyOnHidden?: boolean;
  closeIcon?: boolean;
  modalContainerClassName?: string;
  titleClassName?: string;
  titleContentClassName?: string;
  onClose?: () => void;
}

export interface ConfirmationModalProps {
  isModalOpen: boolean;
  setModalHandler?: (value: ModalHandler) => void;
  width?: number;
  bodyStyle?: CSSProperties | null;
  footer?: ReactNode;
  title?: ReactNode;
  controller?: boolean;
  centered?: boolean;
  mask?: boolean;
  destroyOnHidden?: boolean;
  modalContainerClassName?: string;
  buttonContainerClassName?: string;
  titleClassName?: string;
  onClose?: () => void;
  closeIcon?: boolean;
  cancelButtonTitle?: string;
  cancelButtonClassName?: string;
  onCancel?: () => void;
  confirmButtonTitle?: string;
  confirmButtonClassName?: string;
  onConfirm?: () => void;
  loading?: boolean;
}
