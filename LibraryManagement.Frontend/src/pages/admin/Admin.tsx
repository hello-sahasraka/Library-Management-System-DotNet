import { useEffect, useState } from "react";
import AdminTable from "../../components/AdminTable"
import NavBar from "../../components/NavBar"
import axios from "axios";
import { toast } from "react-toastify";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import AddBook from "../../components/AddBook";
import Loading from "../../components/Loading";
import { Tooltip } from "@mui/material";
import EditUser from "../../components/EditUser";
import ConfirmationBox from "../../components/ConfirmationBox";

const baseURL = import.meta.env.VITE_BACKEND_URL as string;


interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface NewBook {
  title: string;
  author: string;
  description: string;
}



const Admin = () => {
  // State variables
  const [bookList, setBookList] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [state, setState] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  //Fetch book data on component mount and when state changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Book[]>(`${baseURL}/api/v1/books`);
        console.log(response);
        setBookList(response.data);
      } catch (error) {
        toast.error("Failed to fetch book data.");
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state]);

  // Handle adding a new book
  const handleAddBook = async (data: NewBook) => {

    const createPromise = axios.post<Book>(`${baseURL}/api/v1/books`, data, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
    });

    try {
      const response = await toast.promise(createPromise, {
        pending: "Saving book information...",
        success: "Data saved successfully!",
        error: "Something went wrong!",
      });
      console.log(response);
      setOpenAddModal(false);
      setState((s) => !s);
    } catch (err) {
      console.error("Error adding book:", err);
    }
  }

  // Handle deleting a book
  const handleDeleteBook = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/api/v1/books/${id}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      toast.success("Book deleted successfully!");
      setState((s) => !s);
    } catch (error) {
      toast.error("Failed to delete book.");
      console.error("Error deleting book:", error);
    }
  };

  // Handle editing a book
  const handleEditBook = (book: Book) => {
    setOpenEditModal(true);
    setSelectedBook(book);
  }

  // Handle updating a book
  const handleUpdateBook = async (data: Book) => {
    
    const { id, ...updateData } = data;

    try {
      await axios.put(`${baseURL}/api/v1/books/${id}`, updateData, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
      });
      toast.success("Book updated successfully!");
      setState((s) => !s);
    } catch (error) {
      toast.error("Failed to update book.");
      console.error("Error updating book:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <NavBar />
          {/* Admin Table */}
          <AdminTable
            data={bookList}
            onEdit={(book) => handleEditBook(book)}
            onDelete={(id) => {
              setSelectedBookId(id);
              setOpenDeleteModal(true);
            }}
          />
          <div>
            <Tooltip title="Add Book" placement="left-end">
              <button
                className="h-[60px] w-[60px] fixed bottom-8 right-8 bg-[#FF4169] hover:bg-[#FF464D] hover:scale-110
          text-white p-4 rounded-full shadow-lg flex items-center justify-center 
          transition duration-300 cursor-pointer z-100"
                onClick={() => setOpenAddModal(true)}
              >
                <ControlPointOutlinedIcon fontSize="large" />
              </button>
            </Tooltip>
          </div>

          {/* Add Book Modal */}
          <AddBook
            open={openAddModal}
            onClose={() => setOpenAddModal(false)}
            onSubmit={handleAddBook}
          />

          {/* Edit Book Modal */}
          <EditUser
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            onSubmit={handleUpdateBook}
            oldData={selectedBook}
          />

          {/* Confirmation box for deleting a book */}
          <ConfirmationBox
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            handleDeleteBook={() => {
              if (selectedBookId !== null) {
                handleDeleteBook(selectedBookId);
              } else {
                toast.error("No book selected for deletion.");
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Admin