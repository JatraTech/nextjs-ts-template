"use client";

import "@ant-design/v5-patch-for-react-19";
import { brandTheme } from "@/constants/brandTheme";
import { APP_FONT_FAMILY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { ConfigProvider, theme as antTheme } from "antd";
import { useMemo, type ReactNode } from "react";

const { primary, primaryHover, accent } = brandTheme;

/** Snappier overlay motion (antd default slow ≈ 0.3s) */
const motionTokens = {
  motionDurationMid: "0.15s",
  motionDurationSlow: "0.2s",
};

const lightTokens = {
  ...motionTokens,
  fontFamily: APP_FONT_FAMILY,
  colorPrimary: primary,
  colorInfo: accent,
  borderRadius: 6,
  colorBgContainer: "#ffffff",
  colorBgElevated: "#ffffff",
  colorBorder: "#cbd5e1",
  colorText: "#1f1f1f",
  colorTextSecondary: "#64748b",
  colorTextPlaceholder: "#888888",
};

const darkTokens = {
  ...motionTokens,
  fontFamily: APP_FONT_FAMILY,
  colorPrimary: brandTheme.primaryDarkMode,
  colorInfo: "#94a3b8",
  borderRadius: 6,
  colorBgContainer: "#1e293b",
  colorBgElevated: "#1e293b",
  colorBgLayout: "#0f172a",
  colorBorder: "#475569",
  colorText: "#e2e8f0",
  colorTextSecondary: "#94a3b8",
  colorTextPlaceholder: "#94a3b8",
  colorSplit: "#334155",
};

const darkComponentOverrides = {
  Modal: {
    contentBg: "#1e293b",
    headerBg: "#1e293b",
    titleColor: "#f1f5f9",
    colorIcon: "#94a3b8",
    colorIconHover: "#e2e8f0",
  },
  Drawer: {
    colorBgElevated: "#1e293b",
    colorText: "#e2e8f0",
  },
  Table: {
    headerBg: "#0f172a",
    headerColor: "#cbd5e1",
    rowHoverBg: "#334155",
    borderColor: "#475569",
    colorBgContainer: "#1e293b",
  },
  Select: {
    optionSelectedBg: "#334155",
    optionActiveBg: "#475569",
    colorBgElevated: "#1e293b",
    colorText: "#e2e8f0",
    colorTextPlaceholder: "#94a3b8",
  },
  DatePicker: {
    colorBgElevated: "#1e293b",
    colorText: "#e2e8f0",
    colorTextHeading: "#f1f5f9",
    colorIcon: "#94a3b8",
    cellHoverBg: "#334155",
    activeBorderColor: primary,
  },
  Dropdown: {
    colorBgElevated: "#1e293b",
    controlItemBgHover: "#334155",
    colorText: "#e2e8f0",
  },
  Segmented: {
    trackBg: "#0f172a",
    itemColor: "#94a3b8",
    itemSelectedBg: "#334155",
    itemSelectedColor: "#f1f5f9",
    itemHoverBg: "#1e293b",
    itemHoverColor: "#e2e8f0",
  },
  Popover: {
    colorBgElevated: "#1e293b",
    colorText: "#e2e8f0",
  },
  Pagination: {
    colorBgContainer: "#1e293b",
    colorText: "#e2e8f0",
    colorBorder: "#475569",
  },
  Input: {
    colorBgContainer: "transparent",
    colorText: "#e2e8f0",
    colorTextPlaceholder: "#94a3b8",
    activeBorderColor: primary,
    hoverBorderColor: "#64748b",
  },
  Button: {
    defaultBg: "#1e293b",
    defaultBorderColor: "#475569",
    defaultColor: "#e2e8f0",
  },
  Switch: {
    colorPrimary: primary,
    colorTextQuaternary: "#475569",
  },
  Tabs: {
    itemColor: "#94a3b8",
    itemSelectedColor: "#f1f5f9",
    inkBarColor: primary,
  },
  Menu: {
    colorBgElevated: "#1e293b",
    itemColor: "#e2e8f0",
    itemHoverBg: "#334155",
  },
};

export default function AntdConfigProvider({ children }: { children: ReactNode }) {
  const { isDark } = useTheme();

  const theme = useMemo(
    () => ({
      /** Stable class names across SSR and client StyleProvider caches (Next.js). */
      hashed: false,
      algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      token: isDark ? darkTokens : lightTokens,
      components: isDark ? darkComponentOverrides : undefined,
    }),
    [isDark],
  );

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
