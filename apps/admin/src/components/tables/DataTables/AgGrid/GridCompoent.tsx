'use client';

import 'ag-grid-enterprise';
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from 'ag-grid-react';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import type { ColDef, RowSelectionOptions, ValueFormatterParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ContextMenuModule, IntegratedChartsModule, RowNumbersModule } from 'ag-grid-enterprise';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import { AdvertiserListRes, AdvertiserListTableRow } from '@/lib/api/fetchAdvertiser';

// Set your license key here
LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE || '');

ModuleRegistry.registerModules([
  AllCommunityModule,
  ContextMenuModule,
  RowNumbersModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
]);

const map: Record<string, string> = {
  NORMAL: '승인',
  ABNORMAL: '미승인',
};

const CommentButton = () => {
  return (<div style={{ border: '1px solid black' }}>
    <button>등록 및 보기</button>
  </div>)
}

const DetailViewButton = () => {
  const outline = "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
  return (
    <button className={`${outline} inline-flex items-center justify-center font-small rounded-lg transition px-[10px]`}>상세보기</button>
  )
}

const GridComponent = ({data}: {data: AdvertiserListRes}) => {
  const [rowData, setRowData] = useState<AdvertiserListTableRow[]>([]);
  console.log('[rowData]', rowData)

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: '', headerName: 'NO.', width: 100 },
    { field: 'advertiserUserId', headerName: '광고주ID' },
    { field: 'companyName', headerName: '광고주명' },
    { field: '', headerName: '광고주속성' },
    { field: 'ssnCrn', headerName: '사업자번호' },
    { field: 'settleManagerName', headerName: '담당자명' },
    { field: 'settleManagerPhoneNo', headerName: '담당자 연락처' },
    { field: 'email', headerName: '담당자 이메일' },
    { field: 'settleManagerName', headerName: '영업담당자 설정' },
    { field: '', headerName: '광고주 정보설정', cellRenderer: DetailViewButton },
    { field: 'createdAt', headerName: '가입일' },
    {
      field: 'status',
      headerName: '승인상태',
      valueFormatter: (params: ValueFormatterParams) => {
        return map[params.value] || params.value;
      },
    },
    { field: '', headerName: '코멘트', cellRenderer: CommentButton },
  ]);

  const [defaultColDef, setDefaultColDef] = useState({
    resizable: true,
  });

  useEffect(() => {
    if (data) {     
      setRowData(data.contentList)
    }
  }, [data]);

  const pagination = useMemo(() => {
    return {
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 20, 30, 40, 50],
    };
  }, []);

  const rowSelection = useMemo(() => {
    return {
      mode: 'multiRow',
    };
  }, []);

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        // loading={true}
        pagination={true}
        rowNumbers={true}
        // enableCharts={true} // Enable the Charting features
        cellSelection={true}
        rowSelection={rowSelection as RowSelectionOptions}
      />
    </div>
  );
};

export default GridComponent;