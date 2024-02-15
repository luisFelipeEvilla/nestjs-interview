'use client';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const paymentTypes = ['HOURLY', 'SALARY'];

export default function AddEmployeePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [payment_type, setPaymentType] = useState(new Set([]));
  const [payment_rate, setPaymentRate] = useState(0);
  const cookie = useCookies();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = cookie.get('token');
    const user_cookiee = cookie.get('user');

    if (!user_cookiee) {
      toast.error('User not found');
      return (window.location.href = '/auth');
    }

    const user = JSON.parse(user_cookiee);

    const body = {
      name,
      email,
      payment_type: Array.from(payment_type)[0],
      payment_rate,
      enterprise_id: user.enterprise_id,
    };

    try {
      const response = await axios.post('/api/employee', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Employee added');
      window.location.href = '/employee';
    } catch (error) {
      toast.error('Error adding employee');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-center text-2xl">Add Employee</h1>

      <form
        onSubmit={handleSubmit}
        className={`border rounded-md shadow-lg w-[600px] 
      mx-auto flex flex-col gap-4 px-8 py-6`}
      >
        <Input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Select
          label="Payment Type"
          selectedKeys={payment_type}
          //@ts-ignore
          onSelectionChange={setPaymentType}
        >
          {paymentTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </Select>

        <Input
          type="number"
          placeholder="Payment Rate"
          name="payment_rate"
          value={payment_rate.toString()}
          onChange={(e) => setPaymentRate(Number(e.target.value))}
          required
          min={Array.from(payment_type)[0] === 'SALARY' ? 480 : 12}
        />

        <div className="flex justify-center">
          <Button
            type="submit"
            color="success"
            size="md"
            className="text-white"
          >
            Add Employee
          </Button>
        </div>
      </form>
    </div>
  );
}
