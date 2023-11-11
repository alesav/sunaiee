import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { Link } from "./../../navigation";

function Navbar() {
  return (
    <FlowbiteNavbar fluid rounded>
      <FlowbiteNavbar.Brand href="https://flowbite-react.com">
        <img
          src="/icon.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Sunrise AI
        </span>
      </FlowbiteNavbar.Brand>
      <FlowbiteNavbar.Toggle />
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link href="/dashboard" active>
          Dashboard
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#">About</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#">Services</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#">Pricing</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#">Contact</FlowbiteNavbar.Link>
        <Link locale="en" href="/">
          En
        </Link>
        <Link locale="ru" href="/">
          Ru
        </Link>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}

export default Navbar;
