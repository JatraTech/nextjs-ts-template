import { getBrandCssVariableBlock } from "@/constants/brandTheme";

/** Injects brand tokens from `brandTheme.ts` into CSS variables (SSR-safe). */
export default function BrandThemeVariables() {
  return (
    <style
      dangerouslySetInnerHTML={{ __html: getBrandCssVariableBlock() }}
      precedence="default"
    />
  );
}
