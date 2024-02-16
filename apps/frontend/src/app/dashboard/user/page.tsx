'use client';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/authContext';

export default function Index() {
  const [users, setEmployees] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching employees');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User deleted');
    } catch (error) {
      toast.error('Error deleting User');
    } finally {
      fetchData();
    }
  };

  return (
    <div className="text-2xl flex flex-col gap-4 py-4 px-4">
      <div className="flex justify-end">
        <a href="/dashboard/user/add">
          <Button color="success" className="text-white">
            Add User
          </Button>
        </a>
      </div>
      <Table>
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>Full Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Enterprise Name</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody>
          {users.map((user: any) => (
            <TableRow>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.enterprise.name}</TableCell>
              <TableCell className="flex gap-2">
                <a href={`/dashboard/user/${user.id}`}>
                  <Button className="bg-blue-600 text-white">Edit</Button>
                </a>
                <Button
                  onPress={(e) => handleDelete(user.id)}
                  color="danger"
                  className="text-white"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
