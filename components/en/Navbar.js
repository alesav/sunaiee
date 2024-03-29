import { Navbar as FlowbiteNavbar, Dropdown, Button } from "flowbite-react";
import { Link } from "./../../navigation";

export const runtime = "edge";

function Navbar() {
  return (
    <FlowbiteNavbar fluid rounded>
      <FlowbiteNavbar.Brand href="/">
        <img
          src="/icon.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Sunrise AI
        </span>
      </FlowbiteNavbar.Brand>
      <div className="flex md:order-2">
        <Button as={Link} href="https://app2.sunai.ee">
          Sign up / Login
        </Button>
        <FlowbiteNavbar.Toggle />
      </div>
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link href="/about">About</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/pricing">Pricing</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/blog">Blog</FlowbiteNavbar.Link>
        <Dropdown label="Projects" inline>
          <Dropdown.Item>
            <FlowbiteNavbar.Link href="btcusdt15">
              BTC Predicton
            </FlowbiteNavbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <FlowbiteNavbar.Link href="intuition">
              Intuition
            </FlowbiteNavbar.Link>
          </Dropdown.Item>
        </Dropdown>
        <FlowbiteNavbar.Link href="/contact">Contact</FlowbiteNavbar.Link>
        <Dropdown label="Language" inline>
          <Dropdown.Item>
            <Link locale="en" href="/">
              English
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link locale="ru" href="/">
              Russian
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link locale="et" href="/">
              Estonian
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link locale="tr" href="/">
              Turkish
            </Link>
          </Dropdown.Item>
        </Dropdown>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}

export default Navbar;
