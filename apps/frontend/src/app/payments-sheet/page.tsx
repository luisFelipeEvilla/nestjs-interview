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
export default function PaymentSheetsPage() {
  const [timeSheets, setTimeSheets] = useState<any[]>([]);
  const cookies = useCookies();

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const token = cookies.get('token');

    const response = await axios.get('/api/payments-sheet', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTimeSheets(response.data);
  }

  async function handleDelete(id: number) {
    const token = cookies.get('token');

    try {
      const response = await axios.delete(`/api/payments-sheet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeSheets(timeSheets.filter((timeSheet) => timeSheet.id !== id));
      toast.success('Time sheet deleted successfully');
    } catch (error) {
      toast.error('Failed to delete time sheet');
      console.error(error);
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody>
          {timeSheets.map((timeSheet) => (
            <TableRow key={timeSheet.id}>
              <TableCell>{timeSheet.id}</TableCell>
              <TableCell>
                {new Date(timeSheet.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="flex gap-4">
                <a href={`/payments-sheet/${timeSheet.id}`}>
                  <Button
                    className='bg-blue-500 text-white'
                    size='sm'
                  >View</Button>
                </a>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(timeSheet.id)}
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
