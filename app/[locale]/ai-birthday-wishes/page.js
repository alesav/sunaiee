import Birthday from "./birthday";

/*
export const metadata = {
  title: "Demo - ModalJS",
};
*/

export async function generateMetadata({ params, params: { locale } }, parent) {
  // read route params
  const id = params.id;

  // fetch data

  let messages;
  try {
    messages = (await import(`../../../messages/${params.locale}.json`))
      .default;
    console.log("Messages: " + JSON.stringify(params));
  } catch (error) {
    notFound();
  }

  return {
    title: messages.About.metaTitle,
    description: messages.About.metaDescription,
  };
}

const Page = () => {
  return (
    <div>
      <Birthday />
    </div>
  );
};

export default Page;
