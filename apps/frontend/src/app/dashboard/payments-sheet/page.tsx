'use client';

import {
  Button, Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/authContext';
import { Badge } from '@tremor/react';

export default function PaymentSheetsPage({ params }: any) {
  const [timeSheets, setTimeSheets] = useState<any[]>([]);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);
  async function fetchData() {
    const response = await axios.get('/api/payments-sheet', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTimeSheets(response.data);
  }

  async function handleDelete(id: number) {
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

  async function handleCreate() {
    try {
      const response = await axios.post(
        '/api/payments-sheet',
        {
          enterprise_id: user.enterprise_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTimeSheets([...timeSheets, response.data]);

      toast.success('Time sheet created successfully');
    } catch (error) {
      toast.error('Failed to create time sheet');
      console.error(error);
    }
  }

  return (
    <div className="text-2xl flex flex-col gap-4 py-4 px-4">
      <div className="flex flex-row-reverse">
        <Button onPress={handleCreate} color="success" className="text-white">
          create
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Enterprise</TableColumn>
          <TableColumn>Check Date</TableColumn>
          <TableColumn>State</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody>
          {timeSheets.map((timeSheet) => (
            <TableRow key={timeSheet.id}>
              <TableCell>{timeSheet.id}</TableCell>
              <TableCell>{timeSheet.enterprise.name}</TableCell>

              <TableCell>
                {timeSheet.check_date
                  ? new Date(timeSheet.check_date).toLocaleString()
                  : 'Not checked'}
              </TableCell>
              <TableCell>
                { 
                  PaymentSheetBadge(timeSheet.state)
                }
                </TableCell>
              <TableCell>
                {new Date(timeSheet.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="flex gap-4">
                <a href={`/dashboard/payments-sheet/${timeSheet.id}`}>
                  <Button className="bg-blue-500 text-white" size="sm">
                    View
                  </Button>
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

  function PaymentSheetBadge(state: string) {

    if (state === 'PENDING') return  ( <Badge color='warning'>Pending</Badge> )
      
    if (state === 'SUBMIT') return ( <Badge color='blue'>Submit</Badge>)
    
    if (state === 'APPROVED') return ( <Badge color='success'>Approved</Badge> )

    if (state === 'REJECTED') return ( <Badge color='danger'>Rejected</Badge> )  
  }
}
