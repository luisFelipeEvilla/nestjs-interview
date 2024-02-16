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
import { AuthContext } from '../../contexts/authContext';

export default function Index() {
  const [enterprises, setEnterprises] = useState([]);
  const {token} = useContext(AuthContext);
  
  useEffect(() => {
    if (!token) return;

    fetchData();
  }, [token]);
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/enterprise', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setEnterprises(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching enterprises');
    }
  };

  const handleDelete = async (id: number) => {
    try {
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
      <Table data-testid="enterprise-table">
        <TableHeader>
          <TableColumn data-testid="name-column">Enterprise Name</TableColumn>
          <TableColumn data-testid="actions-column">Actions</TableColumn>
        </TableHeader>

        <TableBody>
          {enterprises.map((employee: any) => (
            <TableRow data-testid="enterprise-row">
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
