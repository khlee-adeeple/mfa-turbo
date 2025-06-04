"use client";

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact, CustomLoadingOverlayProps } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  CsvExportModule,
  ExcelExportParams,
  GridApi,
  GridOptions,
  ModuleRegistry,
  NumberFilterModule,
  SideBarDef,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";
import {
  LicenseManager,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  PivotModule,
  SetFilterModule,
} from "ag-grid-enterprise";

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center text-red w-full h-full">
      loading...
    </div>
  );
};

ModuleRegistry.registerModules([
  NumberFilterModule,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
  CsvExportModule,
  PivotModule,
  TextFilterModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

export const useFetchJson = <T,>(url: string, limit?: number) => {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Note error handling is omitted here for brevity
      const response = await fetch(url);
      const json = await response.json();
      const data = limit ? json.slice(0, limit) : json;
      setData(data);
      console.log("[data]", data);
      setLoading(false);
    };
    fetchData();
  }, [url, limit]);
  return { data, loading };
};

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

// Set your license key here
LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE || "");

const AGGridComponent: FunctionComponent = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const gridRef = useRef<AgGridReact<IOlympicData>>(null);

  const loadingOverlayComponentParams = useMemo(() => {
    return { loadingMessage: "One moment please..." };
  }, []);

  const defaultExcelExportParams = useMemo<ExcelExportParams>(() => {
    return {
      exportAsExcelTable: true,
    };
  }, []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "athlete", filter: "agTextColumnFilter", minWidth: 200 },
    { field: "age" },
    { field: "country", minWidth: 180 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      // allow every column to be aggregated
      enableValue: true,
      // allow every column to be grouped
      enableRowGroup: true,
      // allow every column to be pivoted
      enablePivot: true,
      filter: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200,
    };
  }, []);
  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          minWidth: 225,
          width: 225,
          maxWidth: 225,
        },
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
          minWidth: 180,
          maxWidth: 400,
          width: 250,
        },
      ],
      position: "right", // 왼쪽, 오른쪽 둘 중에 하나만 가능
      defaultToolPanel: "filters",
    };
  }, []);

  const { data, loading } = useFetchJson<IOlympicData>(
    "https://www.ag-grid.com/example-assets/olympic-winners.json"
  );

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  return (
    <div style={{ width: "100%", height: "calc(100vh - 200px)" }}>
      <div>
        <button
          className="text-sm border border-solid border-black rounded-sm p-2 mb-2"
          onClick={onBtExport}
        >
          Export to Excel
        </button>
      </div>
      <div style={gridStyle}>
        <AgGridReact<IOlympicData>
          rowData={data}
          loading={loading} // 로딩 사용 여부
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          sideBar={sideBar} // 피봇테이블, 필터 등의 사이드바
          loadingOverlayComponent={LoadingComponent} // 커스텀 로딩 컴포넌트 연결
          loadingOverlayComponentParams={loadingOverlayComponentParams} // 커스텀 로딩에 전달할 파라미터 값
          defaultExcelExportParams={defaultExcelExportParams}
          cellSelection
        />
      </div>
    </div>
  );
};

export default AGGridComponent;
