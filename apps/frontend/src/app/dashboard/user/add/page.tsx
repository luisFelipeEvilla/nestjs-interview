'use client';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { AuthContext } from '@ocmi/frontend/app/contexts/authContext';
import axios from 'axios';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Roles = ['ADMIN', 'USER'];

export default function AddEmployeePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(new Set([]));
  const [password, setPassword] = useState('');

  const [enterprisesList, setEnterprisesList] = useState([]);
  const [selectedEnterprise, setSelectedEnterprise] = useState(new Set([]));

  const { token, user } = useContext(AuthContext);

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

      setEnterprisesList(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching enterprises');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 6) return toast.error('Password must be at least 6 characters');

    const body = {
      name,
      email,
      role: Array.from(role)[0],
      enterprise_id: user.enterprise_id,
      password
    };

    try {
      const response = await axios.post('/api/user', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('User added');
      window.location.href = '/dashboard/user';
    } catch (error) {
      toast.error('Error adding user');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-center text-2xl">Add User</h1>

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

        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <Select
          label="Enterprise"
          //@ts-ignore
          //   onSelectionChange={(value) => user.enterprise_id}
          onSelectionChange={(value) => setSelectedEnterprise(value)}
        >
          {enterprisesList.map((enterprise: any) => (
            <SelectItem key={enterprise.id} value={enterprise.id}>
              {enterprise.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Role"
          selectedKeys={role}
          //@ts-ignore
          onSelectionChange={setRole}
        >
          {Roles.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </Select>

        <div className="flex justify-center">
          <Button
            type="submit"
            color="success"
            size="md"
            className="text-white"
          >
            Add User
          </Button>
        </div>
      </form>
    </div>
  );
}
