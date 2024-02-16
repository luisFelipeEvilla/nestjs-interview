import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { AuthContext } from '@ocmi/frontend/app/contexts/authContext';
import { useContext } from 'react';

export default function AdminNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar isBordered>
      <NavbarBrand>PayPeo</NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href="/dashboard/enterprise">Enterprise</Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/dashboard/employee">Employee</Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/dashboard/payments-sheet">Payments Sheet</Link>
        </NavbarItem>

        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
              id="settings-button"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
