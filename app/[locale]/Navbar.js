"use client";
import React from "react";
import { Navbar as FlowbiteNavbar, Dropdown, Button } from "flowbite-react";
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
      <div className="flex md:order-2">
        <Button as={Link} href="https://app2.sunai.ee">
          Sign up / Login
        </Button>
        <FlowbiteNavbar.Toggle />
      </div>
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link href="/about">{t("About")}</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/pricing">
          {t("Pricing")}
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/blog">{t("Blog")}</FlowbiteNavbar.Link>
        <Dropdown label={t("Projects")} inline>
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
        <FlowbiteNavbar.Link href="/contact">
          {t("Contact")}
        </FlowbiteNavbar.Link>
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
