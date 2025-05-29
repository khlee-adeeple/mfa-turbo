import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import AGGridComponent from "../../../../../components/tables/DataTables/AgGrid/AGGridComponent";

export const metadata: Metadata = {
  title: "Next.js Advanced Data Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Advanced Data Table page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function DataTablesTest() {
  const req = { page: 0, pageSize: 100, searchStr: "" };

  return (
    <div>
      <PageBreadcrumb pageTitle="Data Tables" />
      <div>
        <AGGridComponent />
      </div>
    </div>
  );
}
