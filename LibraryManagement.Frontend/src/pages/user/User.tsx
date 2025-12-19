import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Table from '../../components/Table'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
const baseURL = import.meta.env.VITE_BACKEND_URL as string;

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

const User = () => {
  const [userList, setUserList] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Person[]>(`${baseURL}/api/v1/getusers`);
        console.log(response);
        setUserList(response.data);
      } catch (error) {
        toast.error("Failed to fetch user data.");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <NavBar />
      {loading ? (<Loading />) : <Table data={userList} />}
    </div>
  )
}

export default User