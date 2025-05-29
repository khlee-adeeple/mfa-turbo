"use client";

import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  ModuleRegistry,
  NumberEditorModule,
  NumberFilterModule,
  RowSelectionModule,
  TextEditorModule,
  ValidationModule,
  createGrid,
} from "ag-grid-community";
import {
  ClipboardModule,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  PivotModule,
  SetFilterModule,
} from "ag-grid-enterprise";

// Set your license key here
LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE || "");

ModuleRegistry.registerModules([
  NumberEditorModule,
  TextEditorModule,
  RowSelectionModule,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  SetFilterModule,
  NumberFilterModule,
  ClipboardModule,
  PivotModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: "Participant",
    children: [
      { field: "athlete", minWidth: 170 },
      { field: "country", minWidth: 150 },
    ],
  },
  { field: "sport" },
  {
    headerName: "Medals",
    children: [
      {
        field: "total",
        columnGroupShow: "closed",
        filter: "agNumberColumnFilter",
        width: 120,
        flex: 0,
      },
      {
        field: "gold",
        columnGroupShow: "open",
        filter: "agNumberColumnFilter",
        width: 100,
        flex: 0,
      },
      {
        field: "silver",
        columnGroupShow: "open",
        filter: "agNumberColumnFilter",
        width: 100,
        flex: 0,
      },
      {
        field: "bronze",
        columnGroupShow: "open",
        filter: "agNumberColumnFilter",
        width: 100,
        flex: 0,
      },
    ],
  },
  { field: "year", filter: "agNumberColumnFilter" },
];

const AGGridComponent = () => {
  let gridApi: GridApi<IOlympicData>;
  const gridOptions: GridOptions<IOlympicData> = {
    columnDefs,
    rowSelection: {
      mode: "multiRow",
    },
    defaultColDef: {
      editable: true,
      minWidth: 100,
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    sideBar: {
      toolPanels: ["columns", "filters"],
      defaultToolPanel: "",
    },
  };
  const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
  gridApi = createGrid(gridDiv, gridOptions);
  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then((data: IOlympicData[]) => gridApi!.setGridOption("rowData", data));

  return (
    <div style={{ width: "100%", height: "calc(100vh - 200px)" }}>ag grid</div>
  );
};

export default AGGridComponent;
