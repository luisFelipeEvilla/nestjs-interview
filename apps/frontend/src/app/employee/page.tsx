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
import { useCookies } from 'next-client-cookies';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/authContext';

export default function Index() {
  const [employees, setEmployees] = useState([]);
  const cookie = useCookies();
  const {token} = useContext(AuthContext);
   
  useEffect(() => {
    if (!token) return;

    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/employee', {
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
      await axios.delete(`/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Employee deleted');
    } catch (error) {
      toast.error('Error deleting employee');
    } finally {
      fetchData();
    }
  };

  return (
    <div className="text-2xl flex flex-col gap-4 py-4 px-4">
      <div className="flex justify-end">
        <a href="/employee/add">
          <Button color="success" className="text-white">
            Add Employee
          </Button>
        </a>
      </div>
      <Table>
        <TableHeader>
          <TableColumn>Full Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Payment Type</TableColumn>
          <TableColumn>Payment Rate</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody>
          {employees.map((employee: any) => (
            <TableRow>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.payment_type}</TableCell>
              <TableCell>{employee.payment_rate} USD</TableCell>
              <TableCell className="flex gap-2">
                <Button className="bg-blue-600 text-white">
                  <a href={`/employee/${employee.id}`}>Edit</a>
                </Button>
                <Button
                  onPress={(e) => handleDelete(employee.id)}
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
