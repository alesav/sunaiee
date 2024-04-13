import { Inter } from "next/font/google";
import "./globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

const locales = ["en", "ru", "et", "tr"];

// Function to get the metadata based on the locale and page
async function getMetadata(locale, page) {
  let metadata;
  try {
    console.log("Page", page);
    const allMetadata = (await import(`../../metadata/${locale}.json`)).default;
    metadata = allMetadata[page];
  } catch (error) {
    notFound();
  }
  return metadata;
}

export default async function RootLayout({
  children,
  params: { locale, page },
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Get the metadata for the current locale and page
  const metadata = await getMetadata(locale, page);

  return (
    <html lang={locale}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add other metadata as needed */}
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
