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
import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import toast from 'react-hot-toast';

export default function Index() {
  const [employees, setEmployees] = useState([]);
  const cookie = useCookies();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const token = cookie.get('token');
    const response = await axios.get('/api/enterprise', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEmployees(response.data);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = cookie.get('token');
      await axios.delete(`/api/enterprise/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Enterprise deleted');
    } catch (error) {
      toast.error('Error deleting Enterprise');
    } finally {
      fetchData();
    }
  };

  return (
    <div className="text-2xl flex flex-col gap-4 py-4 px-4">
      <div className="flex justify-end">
        <a href="/dashboard/enterprise/add">
          <Button color="success" className="text-white">
            Add Enterprise
          </Button>
        </a>
      </div>
      <Table>
        <TableHeader>
          <TableColumn>Enterprise Name</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody>
          {employees.map((employee: any) => (
            <TableRow>
              <TableCell>{employee.name}</TableCell>
              <TableCell className="flex gap-2">
                <a href={`/dashboard/enterprise/${employee.id}`}>
                  <Button className="bg-blue-600 text-white">Edit</Button>
                </a>
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
