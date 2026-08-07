import React, { useState, useCallback, useRef, useMemo } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeAlpine } from 'ag-grid-community';
import { Upload, FileSpreadsheet, Download, X, AlertCircle } from 'lucide-react';

// Register all community modules (required in v36+)
ModuleRegistry.registerModules([AllCommunityModule]);

export default function SpreadsheetApp() {
  const [rowData, setRowData] = useState(null);
  const [columnDefs, setColumnDefs] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  
  const gridRef = useRef(null);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 120,
    editable: true,
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const processData = (data, name, type) => {
    if (!data || data.length === 0) {
      setError('The file appears to be empty.');
      return;
    }

    const headers = Object.keys(data[0]);
    const cols = headers.map(header => ({
      field: header,
      headerName: header,
    }));

    setColumnDefs(cols);
    setRowData(data);
    setFileName(name);
    setFileType(type);
    setError('');
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    
    const name = file.name;
    const extension = name.split('.').pop().toLowerCase();

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target.result;
      
      try {
        if (extension === 'csv') {
          Papa.parse(result, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              if (results.errors.length > 0) {
                console.warn('CSV parsing issues:', results.errors);
              }
              processData(results.data, name, 'csv');
            },
            error: (err) => {
              setError('Failed to parse CSV file: ' + err.message);
            }
          });
        } else if (extension === 'xlsx' || extension === 'xls') {
          const workbook = XLSX.read(result, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          processData(data, name, extension);
        } else {
          setError('Unsupported file type. Please upload a .csv, .xls, or .xlsx file.');
        }
      } catch (err) {
        setError('Error reading file: ' + err.message);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the file.');
    };

    if (extension === 'csv') {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleExport = () => {
    if (!gridRef.current || !rowData) return;

    const gridData = [];
    gridRef.current.api.forEachNode(node => gridData.push(node.data));

    if (fileType === 'csv') {
      const csv = Papa.unparse(gridData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `edited_${fileName}`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const worksheet = XLSX.utils.json_to_sheet(gridData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `edited_${fileName}`);
    }
  };

  const handleReset = () => {
    setRowData(null);
    setColumnDefs(null);
    setFileName('');
    setFileType('');
    setError('');
  };

  // ── Grid View ──
  if (rowData && columnDefs) {
    return (
      <div className="w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileSpreadsheet aria-hidden="true" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{fileName}</h3>
              <p className="text-xs text-gray-500">{rowData.length} rows · {columnDefs.length} columns</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              aria-label="Export file"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Download aria-hidden="true" size={16} />
              Export {fileType.toUpperCase()}
            </button>
            <button
              onClick={handleReset}
              aria-label="Close file"
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Close File"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>
        </div>

        {/* AG Grid – v36 uses the `theme` prop instead of CSS class names */}
        <div style={{ height: 500, width: '100%' }}>
          <AgGridReact
            ref={gridRef}
            theme={themeAlpine}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
          />
        </div>
      </div>
    );
  }

  // ── Dropzone View ──
  return (
    <div className="w-full">
      {error && (
        <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
          <AlertCircle aria-hidden="true" className="shrink-0 mt-0.5" size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      
      <div
        role="button"
        aria-label="File upload dropzone"
        tabIndex="0"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('file-upload').click(); }}
        className={`w-full max-w-3xl mx-auto p-6 sm:p-12 border-2 rounded-2xl transition-all duration-200 ease-in-out text-center cursor-pointer
          ${isDragging 
            ? 'border-solid border-blue-600 bg-blue-50 scale-[1.02] ring-4 ring-blue-500/20' 
            : 'border-dashed border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
          }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <Upload aria-hidden="true" size={32} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Drop your CSV or Excel file here
        </h3>
        <p className="text-gray-700 mb-8">
          or click to browse from your computer
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-700">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> .csv
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> .xlsx
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> .xls
          </span>
        </div>
        
        <input
          id="file-upload"
          aria-label="Upload file"
          type="file"
          className="hidden"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileInput}
        />
      </div>
    </div>
  );
}
