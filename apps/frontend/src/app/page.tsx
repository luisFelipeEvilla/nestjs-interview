'use client';

import {
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

export default function Index() {
  const [employees, setEmployees] = useState([]);
  const cookie = useCookies();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const token = cookie.get('token');
    const response = await axios.get('/api/employee', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEmployees(response.data);
  };

  return (
    <div className="text-2xl">
      <Table>
        <TableHeader>
          <TableColumn>Full Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Payment Type</TableColumn>
        </TableHeader>

        <TableBody>
          {employees.map((employee: any) => (
            <TableRow>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.payment_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
