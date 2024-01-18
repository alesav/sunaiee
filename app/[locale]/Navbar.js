import { Navbar as FlowbiteNavbar, Dropdown } from "flowbite-react";
import { Link } from "./../../navigation";
import { useTranslations } from "next-intl";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";

export const runtime = "edge";

function Navbar() {
  const t = useTranslations("Navbar");
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
      <FlowbiteNavbar.Toggle />
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link href="/dashboard" active>
          {t("AI_Support")}
        </FlowbiteNavbar.Link>
        <Dropdown label={t("Crypto")} inline>
          <Dropdown.Item>
            <FlowbiteNavbar.Link href="btcusdt15">
              {t("BTC_prediction")}
            </FlowbiteNavbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <FlowbiteNavbar.Link href="intuition">
              {t("Intuition")}
            </FlowbiteNavbar.Link>
          </Dropdown.Item>
        </Dropdown>
        <Dropdown label={t("Language")} inline>
          <Dropdown.Item>
            <Link locale="en" href="/">
              {t("English")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link locale="ru" href="/">
              {t("Russian")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link locale="et" href="/">
              {t("Estonian")}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link locale="tr" href="/">
              {t("Turkish")}
            </Link>
          </Dropdown.Item>
        </Dropdown>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}

export default Navbar;
