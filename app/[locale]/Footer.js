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
        <Footer.Link href="/about">{t("About")}</Footer.Link>
        <Footer.Link href="/pricing">{t("Pricing")}</Footer.Link>
        <Footer.Link href="/blog">{t("Blog")}</Footer.Link>
        <Footer.Link href="/contact">{t("Contact")}</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default FooterComponent;
