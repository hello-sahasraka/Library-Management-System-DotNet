import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { Button, Stack } from '@mui/material';

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
}

const AdminTable = ({
    data,
    onEdit,
    onDelete,
}: {
    data: Book[];
    onEdit: (book: Book) => void;
    onDelete: (id: number) => void;
}) => {

    // Define columns (memoized)
    const columns = useMemo<MRT_ColumnDef<Book>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Title',
                size: 150,
                Cell({ row }) {
                    const title = row.original.title;

                    return (
                        <Stack direction="row" spacing={1} className='flex items-center'>
                            <span className='rounded-full aspect-square w-[30px] text-[#FF4169] font-semibold
                            bg-white border-[#FF4169] border-2 flex items-center justify-center'>{title[0] || ''}</span>
                            <h1>{title}</h1>
                        </Stack>
                    )
                }
            },
            {
                accessorKey: 'author',
                header: 'Author',
                size: 150,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 300,
            },
            {
                header: 'Actions',
                id: 'actions',
                size: 100,
                Cell: ({ row }) => {
                    const person = row.original;
                    return (
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => onEdit(person)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => onDelete(person.id)}
                            >
                                Delete
                            </Button>
                        </Stack>
                    );
                },
            },
        ],
        [onEdit, onDelete],
    );

    const table = useMaterialReactTable({
        columns,
        data,
    });

    return <MaterialReactTable table={table} />;
};

export default AdminTable;
