'use client';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { AuthContext } from '@ocmi/frontend/app/contexts/authContext';

type PaymentSheet = {
  id: number;
  created_at: string;
  check_date: Date;
  employee_payment: employee_payment[];
  enterprise_id: number;
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
    check_date: new Date(),
    enterprise_id: 0,
  });
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    fetchData();
  }, [token]);
  async function fetchData() {
    try {
      const response = await axios.get(`/api/payments-sheet/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      response.data.check_date = new Date(response.data.check_date);

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
            total: employee_payment.payment_rate * +event.target.value,
          };
        }
        return employee_payment;
      },
    );

    setPaymentSheet({
      ...paymentSheet,
      // @ts-ignore
      check_date: paymentSheet.check_date,
      employee_payment: newEmployeesPayment,
    });
  };

  const handleSubtmit = async () => {
    try {
      await axios.patch(`/api/payments-sheet/${params.id}`, paymentSheet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Payment sheet updated successfully');
    } catch (error) {
      toast.error('Failed to update payment sheet');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-row-reverse ">
        <Input
          size="sm"
          className="max-w-[200px]"
          label="Check Date"
          placeholder="Select a Check Date of the payroll"
          type="date"
          value={paymentSheet.check_date.toISOString().split('T')[0]}
          onChange={(e) =>
            setPaymentSheet({
              ...paymentSheet,
              check_date: new Date(e.target.value),
            })
          }
          required
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
          {paymentSheet.employee_payment.map((employee_payment) => (
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
                    onChange={(e) => handleUnitChange(e, employee_payment.id)}
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
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-row-reverse ">
        <Button onClick={handleSubtmit} color="success" className="text-white">
          Save
        </Button>
      </div>
    </div>
  );
}
