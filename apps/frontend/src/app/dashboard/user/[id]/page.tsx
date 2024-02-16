'use client';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { AuthContext } from '@ocmi/frontend/app/contexts/authContext';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const paymentTypes = ['HOURLY', 'SALARY'];

export default function EditEmployePage({ params }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(new Set<string>([]));
  const [password, setPassword] = useState('');

  const [enterprisesList, setEnterprisesList] = useState([]);
  const [selectedEnterprise, setSelectedEnterprise] = useState(
    new Set<string>([]),
  );

  const { token } = useContext(AuthContext);

  const Roles = ['ADMIN', 'USER'];

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  async function fetchData() {
    const response = await axios.get(`/api/user/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const enterprises = await axios.get('/api/enterprise', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEnterprisesList(enterprises.data);

    setName(response.data.name);
    setEmail(response.data.email);
    setRole(new Set([response.data.role]));
    console.log(response.data.enterprise_id);
    setSelectedEnterprise(new Set([response.data.enterprise_id.toString()]));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      name,
      email,
      role: Array.from(role)[0],
      enterprise_id: +Array.from(selectedEnterprise)[0],
      password: password.length > 0 ? password : undefined,
    };

    try {
      const response = await axios.patch(`/api/user/${params.id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Employee updated');
      window.location.href = '/dashboard/user';
    } catch (error) {
      toast.error('Error updating employee');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-center text-2xl">Edit User</h1>

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
          selectedKeys={selectedEnterprise}
          //@ts-ignore
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
            Update Employee
          </Button>
        </div>
      </form>
    </div>
  );
}
