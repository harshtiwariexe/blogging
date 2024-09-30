"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

interface childrenProp {
  children: React.ReactNode;
}

export default function ThemeProviderWrapper({ children }: childrenProp) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
