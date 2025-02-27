"use client";

import { Product } from "@/models/product.model";
import { getProducts } from "@/services/product.service";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simular una llamada a la API para obtener los productos
      const response = await getProducts();
      setProducts(response);
      const uniqueColors = Array.from(
        new Set(response.map((product) => product.color))
      );
      setColors(uniqueColors);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const getState = (state: string) => {
    if (state == "activo") {
      return <div className="badge badge-success">Activo</div>;
    } else if (state == "sin existencias") {
      return <div className="badge badge-error">Sin Existencias</div>;
    }
  };

  // Definir las columnas para la tabla de productos
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "rollo", // Acceder al nombre del producto
        header: "Rollo",
        size: 100,
        enableColumnFilter: false, // Ocultar filtro
      },
      {
        accessorKey: "calibre", // Acceder al precio
        header: "Calibre",
        size: 100,
        //Cell: ({ cell }) => `$${cell.getValue<number>().toFixed(2)}`, // Mostrar precio en formato de moneda
      },
      {
        accessorKey: "ral", // Acceder al stock
        header: "RAL",
        enableColumnFilter: false, // Ocultar filtro
        size: 100,
      },
      {
        accessorKey: "color", // Acceder al stock
        header: "Color",
        filterVariant: "select",
        filterSelectOptions: colors,
        size: 50,
      },
      {
        accessorKey: "pesoKg", // Acceder al stock
        header: "Peso Kg",
        size: 100,
        enableColumnFilter: false, // Ocultar filtro
      },
      {
        accessorKey: "fechaIngreso", // Acceder al stock
        header: "Fecha Ingreso",
        size: 50,
        enableColumnFilter: false, // Ocultar filtro
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<Date>());
          return date.toLocaleDateString(); // Format the date as you prefer
        },
      },
      {
        accessorKey: "importador", // Acceder al stock
        header: "Importador",
        size: 100,
        enableColumnFilter: false, // Ocultar filtro
      },
      {
        accessorKey: "observaciones", // Acceder al stock
        header: "Observaciones",
        size: 100,
        enableColumnFilter: false, // Ocultar filtro
      },
      {
        accessorKey: "estado", // Acceder a la disponibilidad
        header: "Estado",
        filterVariant: "select",
        filterSelectOptions: ["activo", "sin existencias"],
        size: 150,
        Cell: ({ cell }) => getState(cell.getValue<string>()),
      },
    ],
    [colors]
  );

  const table = useMaterialReactTable({
    columns,
    initialState: {
      showColumnFilters: true,
      columnFilters: [{ id: "estado", value: "activo" }],
    }, // Mostrar filtros por defecto
    data: products, // Los datos deben ser memorizados o estables
    enableRowSelection: true,
    state: {
      isLoading: isLoading, //cell skeletons and loading overlay
      showProgressBars: isLoading, //progress bars while refetching
      isSaving: isLoading, //progress bars and save button spinners
    },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: 800,
        fontSize: "14px",
        backgroundColor: "#74b9ff",
      },
    },
    localization: {
      clearSort: "Limpiar orden",
      clearFilter: "Limpiar filtro",
      filterByColumn: "Filtrar por {column}",
      sortByColumnDesc: "Ordenar por {column} descendente",
      sortByColumnAsc: "Ordenar por {column} ascendente",
      hideColumn: "Ocultar columna {column}",
      hideAll: "Ocultar todo",
      showAll: "Mostrar todo",
      showAllColumns: "Mostrar todas las columnas",
      showHideColumns: "Mostrar/ocultar columnas",
      showHideSearch: "Mostrar/ocultar búsqueda",
      showHideFilters: "Mostrar/ocultar filtros",
      search: "Buscar",
      toggleDensity: "Cambiar densidad",
      toggleFullScreen: "Cambiar pantalla completa",
      rowsPerPage: "Filas por página",
      clearSelection: "Limpiar selección",
      selectedCountOfRowCountRowsSelected: "{selectedCount} de {rowCount} filas seleccionadas",
    },
  });

  return (
    <div className="p-5">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default ProductTable;
