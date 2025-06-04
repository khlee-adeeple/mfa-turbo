import { LicenseManager } from "ag-grid-enterprise";

let initialized = false;

export const initAgGrid = () => {
  if (!initialized && typeof window !== "undefined") {
    LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE!);
    initialized = true;
  }
};
