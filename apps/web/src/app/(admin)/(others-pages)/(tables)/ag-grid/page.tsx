import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";
import GridComponent from "../../../../../components/tables/DataTables/AgGrid/GridCompoent";
import { Metadata } from "next";
import React from "react";
import { fetchAdvertiserList } from "../../../../../lib/api/fetchAdvertiser";

export const metadata: Metadata = {
  title: "Next.js Advanced Data Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Advanced Data Table page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function DataTables() {
  const req = { page: 0, pageSize: 100, searchStr: "" };
  const data = await fetchAdvertiserList(req);

  console.log("[data]", data);

  return (
    <div>
      <PageBreadcrumb pageTitle="Data Tables" />
      <div>
        <GridComponent data={data} />
      </div>
    </div>
  );
}
