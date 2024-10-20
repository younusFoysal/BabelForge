import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const twconfig = resolveConfig(tailwindConfig);

const mdBreakPoint = Number.parseInt(twconfig.theme.screens.md);

export { mdBreakPoint };
