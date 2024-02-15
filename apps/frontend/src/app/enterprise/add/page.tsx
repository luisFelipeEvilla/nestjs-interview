'use client';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const paymentTypes = ['HOURLY', 'SALARY'];

export default function AddEmployeePage() {
  const [name, setName] = useState('');
  const cookie = useCookies();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = cookie.get('token');

    const body = {
      name,
    };

    try {
      const response = await axios.post('/api/enterprise', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Enterprise added');
      window.location.href = '/enterprise';
    } catch (error) {
      toast.error('Error adding Enterprise');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-center text-2xl">Add Enterprise</h1>

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
        <div className="flex justify-center">
          <Button
            type="submit"
            color="success"
            size="md"
            className="text-white"
          >
            Add Enterprise
          </Button>
        </div>
      </form>
    </div>
  );
}
