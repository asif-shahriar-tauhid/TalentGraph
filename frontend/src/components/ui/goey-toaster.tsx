"use client";

import "goey-toast/styles.css";
import {
  GooeyToaster as BaseGooeyToaster,
  type GooeyToasterProps,
  gooeyToast,
} from "goey-toast";
import { useTheme } from "@/providers/themeProvider";

export function GooeyToaster({
  theme,
  position = "bottom-right",
  ...props
}: GooeyToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <BaseGooeyToaster
      position={position}
      theme={theme ?? resolvedTheme}
      {...props}
    />
  );
}

export { gooeyToast };
export default GooeyToaster;
