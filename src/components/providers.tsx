"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {/* 9-nine 準拠の白ベースデザインのためライトテーマ固定 */}
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        forcedTheme="light"
        storageKey="color-recollection-theme"
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
