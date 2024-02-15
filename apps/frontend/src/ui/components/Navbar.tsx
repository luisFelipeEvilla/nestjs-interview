import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

export default function AdminNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        PayPeo
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href="/enterprise">Enterprise</Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/employee">Employee</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
