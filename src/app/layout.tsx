import AppWrapper from "@/components/shared/AppWrapper";
import BrandThemeVariables from "@/components/shared/BrandThemeVariables";
import ThemeScript from "@/components/shared/ThemeScript";
import { AuthProvider } from "@/context/AuthContext";
import { siteConfig } from "@/constants/site";
import type { ThemeMode } from "@/constants/themeMode";
import { ThemeProvider } from "@/context/ThemeContext";
import { parseThemeCookie, THEME_COOKIE_NAME } from "@/utils/themeCookie";
import ExternalOverlays from "@/components/shared/ExternalOverlays/ExternalOverlays";
import NavigationLoader from "@/components/shared/NavigationLoader/NavigationLoader";
import AntdConfigProvider from "@/providers/AntdConfigProvider";
import QueryProvider from "@/providers/QueryProvider";
import "@/styles/antd.css";
import "@/styles/globals.css";
import AntdRegistry from "@/providers/AntdRegistry";
import { buildRootMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Figtree } from "next/font/google";
import { Suspense, type ReactNode } from "react";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = buildRootMetadata();

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const initialTheme: ThemeMode =
    parseThemeCookie(cookieStore.get(THEME_COOKIE_NAME)?.value) ?? "light";

  return (
    <html lang={siteConfig.language} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <BrandThemeVariables />
        <ThemeScript />
      </head>
      <body className={`${figtree.variable} antialiased`} suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            <AntdRegistry>
              <ThemeProvider initialMode={initialTheme}>
                <AntdConfigProvider>
                  <ExternalOverlays />
                  <Suspense>
                    <NavigationLoader>
                      <AppWrapper>{children}</AppWrapper>
                    </NavigationLoader>
                  </Suspense>
                </AntdConfigProvider>
              </ThemeProvider>
            </AntdRegistry>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
