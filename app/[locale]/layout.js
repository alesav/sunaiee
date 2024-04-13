import { Inter } from "next/font/google";
import "./globals.css";
import { useLocale } from "next-intl";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

const locales = ["en", "ru", "et", "tr"];

export default async function RootLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Access the translated strings using the `useTranslations` hook

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "title", // Use the translated title from the locale file
  description: "description", // Use the translated description from the locale file
};
