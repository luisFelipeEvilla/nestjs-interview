'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

export default function PaymentSheetDetail() {
  const [employees, setEmployees] = useState<any[]>([]);
  const cookies = useCookies();

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const token = cookies.get('token');

    const response = await axios.get('/api/employee', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEmployees(response.data);
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableColumn>Employee Name</TableColumn>
          <TableColumn>Payment Type</TableColumn>
          <TableColumn>Payment Rate</TableColumn>
          <TableColumn>Unit</TableColumn>
          <TableColumn>Check Date</TableColumn>
          <TableColumn>Payment Amount</TableColumn>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.payment_type}</TableCell>
              <TableCell>{employee.payment_rate} USD</TableCell>
              <TableCell>
                {employee.payment_type === 'HOURLY' ? (
                  <Input size="sm" type="number" defaultValue={'0'} />
                ) : (
                  1
                )}
              </TableCell>
              <TableCell>
                <Input size="sm" type="date" />
                </TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
