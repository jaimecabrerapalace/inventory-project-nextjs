"use client";

import React, { useEffect, useState } from "react";
import { parse } from "csv-parse/browser/esm"; // Importa csv-parse
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Paper, Button, CircularProgress } from "@mui/material"; // Importa CircularProgress para la carga
import TableSkeleton from "@/components/TableSkeleton";

const UploadFile = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
      setLoading(true); // Detener la carga solo si está autenticado
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target?.result as string;
        parse(
          csvData,
          {
            columns: true,
            trim: true,
            delimiter: ",", // Especifica el delimitador aquí
            cast: (value) => {
              return value === "null" ? null : value;
            },
          },
          (err, records) => {
            if (err) {
              console.error("Error parsing CSV:", err);
            } else {
              setData(records); // Actualizar el estado con los datos
            }
          }
        );
      };
      reader.readAsText(file); // Leer el archivo como texto
    }
  };

  const columns: MRT_ColumnDef<any>[] = React.useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar el encabezado
    }));
  }, [data]);

  const handleSave = () => {
    console.log("Datos guardados:", data);
    alert("Datos guardados exitosamente.");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Upload File</h1>
      <input
        type="file"
        className="file-input w-full max-w-xs"
        onChange={handleFileChange}
      />
      {data.length > 0 && (
        <Paper className="mt-5 p-2">
          <h2 className="text-xl font-semibold">Data:</h2>
          <MaterialReactTable
            columns={columns}
            data={data}
            initialState={{ showColumnFilters: true }}
            enablePagination
            enableSorting
            enableColumnFilterModes={true}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="mt-5"
          >
            Guardar
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default UploadFile;
