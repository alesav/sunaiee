"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Footer } from "flowbite-react";

const FooterComponent = () => {
  const t = useTranslations("Footer");
  return (
    <Footer container>
      <Footer.Copyright by="Sunrise AI" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href={t("about_us_url")}>{t("About")}</Footer.Link>
        <Footer.Link href="/pricing">{t("Pricing")}</Footer.Link>
        <Footer.Link href={t("blog_url")}>{t("Blog")}</Footer.Link>
        <Footer.Link href="/contact">{t("Contact")}</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default FooterComponent;
