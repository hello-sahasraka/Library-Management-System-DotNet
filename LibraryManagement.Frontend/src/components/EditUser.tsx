import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
}

interface EditBookModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    oldData: Book | null;
}

interface BookFormData {
    title: string;
    author: string;
    description: string;
}

const EditBook = ({ open, onClose, onSubmit, oldData }: EditBookModalProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { register, handleSubmit, reset } = useForm<BookFormData>();

    useEffect(() => {
        if (oldData) {
            reset({
                title: oldData.title,
                author: oldData.author,
                description: oldData.description,
            });
        }
    }, [oldData, reset]);

    const handleFormSubmit = (data: BookFormData) => {
        if (!oldData) {
            toast.error("No book selected to update.");
            return;
        }

        const updated: Book = {
            id: oldData.id,
            title: data.title.trim(),
            author: data.author.trim(),
            description: (data.description ?? "").trim(),
        };

        onSubmit(updated);
        reset();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    py: isMobile ? 1 : 2,                     // Responsive padding
                    px: isMobile ? 1 : 2,
                    outline: '2px solid #ddd',
                    outlineOffset: isMobile ? "-3px" : "-6px", // Smaller outline offset for mobile
                    borderRadius: isMobile ? 1 : 2,            // Softer radius on mobile
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontSize: isMobile ? 22 : 30,   // Responsive title font size
                    textAlign: 'center',
                    pb: isMobile ? 1 : 2,
                }}
            >
                Update
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={isMobile ? 1.5 : 2} mt={1}>
                    <TextField
                        label="Title"
                        {...register('title')}
                        fullWidth
                        size={isMobile ? "small" : "medium"}
                    />
                    <TextField
                        label="Author"
                        {...register('author')}
                        fullWidth
                        size={isMobile ? "small" : "medium"}
                    />
                    <TextField
                        label="Description"
                        {...register('description')}
                        fullWidth
                        size={isMobile ? "small" : "medium"}
                    />
                </Stack>
            </DialogContent>

            <DialogActions
                sx={{
                    flexDirection: isMobile ? "column" : "row",  // Buttons stacked on mobile
                    gap: isMobile ? 1 : 0,
                    px: isMobile ? 1 : 3,
                    pb: isMobile ? 1 : 2,
                }}
            >
                <Button
                    onClick={onClose}
                    color="secondary"
                    fullWidth={isMobile}
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleSubmit(handleFormSubmit)}
                    variant="contained"
                    color="primary"
                    fullWidth={isMobile}
                    sx={{
                        backgroundColor: '#ff464d',
                        '&:hover': {
                            backgroundColor: '#cc383d',
                        },
                        mr: isMobile ? 0 : 2,
                    }}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBook;
