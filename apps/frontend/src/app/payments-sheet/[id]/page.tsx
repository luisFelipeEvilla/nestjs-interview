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
import toast from 'react-hot-toast';

type PaymentSheet = {
  id: number;
  created_at: string;
  employee_payment: employee_payment[];
};

type employee_payment = {
  id: number;
  payment_type: string;
  payment_rate: number;
  units: number;
  employee: {
    name: string;
  };
};

export default function PaymentSheetDetail({ params }: any) {
  const [paymentSheet, setPaymentSheet] = useState<PaymentSheet>({
    id: 0,
    created_at: '',
    employee_payment: [],
  });
  const cookies = useCookies();

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const token = cookies.get('token');

    try {
        const response = await axios.get(`/api/payments-sheet/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setPaymentSheet(response.data);
    } catch (error) {
        toast.error('Failed to fetch payment sheet');
        console.error(error);
    }

  }

  const handleUnitChange = (event: any, id: number) => {
    if (!paymentSheet) return;
    const newEmployeesPayment = paymentSheet.employee_payment.map(
      (employee_payment) => {
        if (employee_payment.id === id) {
          return {
            ...employee_payment,
            units: +event.target.value,
          };
        }
        return employee_payment;
      },
    );

    setPaymentSheet({
      ...paymentSheet,
      employee_payment: newEmployeesPayment,
    });
  };
  return (
    <div>
      <div className="flex flex-row-reverse ">
        <Input
          size="sm"
          className="max-w-[200px]"
          label="Check Date"
          placeholder="Select a Check Date of the payroll"
          type="date"
        />
      </div>
      <Table>
        <TableHeader>
          <TableColumn>Employee Name</TableColumn>
          <TableColumn>Payment Type</TableColumn>
          <TableColumn>Payment Rate</TableColumn>
          <TableColumn>Unit</TableColumn>
          <TableColumn>Payment Amount</TableColumn>
        </TableHeader>

        <TableBody>
            {
            paymentSheet.employee_payment.map((employee_payment) => (
                <TableRow key={employee_payment.id}>
                  <TableCell>{employee_payment.employee.name}</TableCell>
                  <TableCell>{employee_payment.payment_type}</TableCell>
                  <TableCell>{employee_payment.payment_rate} USD</TableCell>
                  <TableCell>
                    {employee_payment.payment_type === 'HOURLY' ? (
                      <Input
                        size="sm"
                        type="number"
                        defaultValue={'0'}
                        value={employee_payment.units.toString()}
                        onChange={(e) =>
                          handleUnitChange(e, employee_payment.id)
                        }
                        min={0}
                      />
                    ) : (
                      1
                    )}
                  </TableCell>
                  <TableCell>
                    {employee_payment.payment_rate * employee_payment.units} USD
                  </TableCell>
                </TableRow>
              ))
            }
        </TableBody>
      </Table>
    </div>
  );
}
