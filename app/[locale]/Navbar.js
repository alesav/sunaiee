"use client";
import React from "react";
import { Navbar as FlowbiteNavbar, Dropdown, Button } from "flowbite-react";
import { Link } from "./../../navigation";
import { useTranslations } from "next-intl";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";

export const runtime = "edge";

const LanguageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21.41 8.64v-.05a10 10 0 0 0-18.78 0s0 0 0 .05a9.86 9.86 0 0 0 0 6.72v.05a10 10 0 0 0 18.78 0s0 0 0-.05a9.86 9.86 0 0 0 0-6.72M4.26 14a7.82 7.82 0 0 1 0-4h1.86a16.73 16.73 0 0 0 0 4Zm.82 2h1.4a12.15 12.15 0 0 0 1 2.57A8 8 0 0 1 5.08 16m1.4-8h-1.4a8 8 0 0 1 2.37-2.57A12.15 12.15 0 0 0 6.48 8M11 19.7A6.34 6.34 0 0 1 8.57 16H11Zm0-5.7H8.14a14.36 14.36 0 0 1 0-4H11Zm0-6H8.57A6.34 6.34 0 0 1 11 4.3Zm7.92 0h-1.4a12.15 12.15 0 0 0-1-2.57A8 8 0 0 1 18.92 8M13 4.3A6.34 6.34 0 0 1 15.43 8H13Zm0 15.4V16h2.43A6.34 6.34 0 0 1 13 19.7m2.86-5.7H13v-4h2.86a14.36 14.36 0 0 1 0 4m.69 4.57a12.15 12.15 0 0 0 1-2.57h1.4a8 8 0 0 1-2.4 2.57M19.74 14h-1.86a16.16 16.16 0 0 0 .12-2a16.28 16.28 0 0 0-.12-2h1.86a7.82 7.82 0 0 1 0 4"
    />
  </svg>
);

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
        <Button
          as={Link}
          href="https://app2.sunai.ee/login"
          outline
          className="mr-3 text-white bg-[#FF9119]"
        >
          {t("Login")}
        </Button>
        <Button
          as={Link}
          href="https://app2.sunai.ee/register"
          class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
        >
          {t("SignUp")}
        </Button>
        <FlowbiteNavbar.Toggle />
      </div>
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link href="/about">{t("About")}</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/pricing">
          {t("Pricing")}
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href={t("blog_url")}>
          {t("Blog")}
        </FlowbiteNavbar.Link>
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
        <Dropdown
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <LanguageIcon />
              <span style={{ marginLeft: "0.2rem" }}>{t("Language")}</span>
            </div>
          }
          inline
        >
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
