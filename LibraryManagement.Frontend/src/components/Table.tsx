import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Stack } from '@mui/material';
import userIcon from "../assets/user_icon.png";

interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  address: string;
  phone: string;
  image?: string;
  roles: string;
}

const Table = ({ data }: { data: Person[] }) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Full Name',
        size: 150,
        Cell({ row }) {
          const image = row.original.image;
          const name = row.original.name;

          return (
            <Stack direction="row" spacing={1} className='flex items-center'>
              <img
                src={image || userIcon}
                alt={name}
                className="h-8 sm:h-10 aspect-square rounded-full object-cover border-2 border-gray-400
                                "
              />
              <h1>{name}</h1>
            </Stack>
          )
        }
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 150,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
