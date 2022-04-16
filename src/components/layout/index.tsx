import Menu from "../Menu";
import Header from "../header";

export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Menu></Menu>
    </>
  );
}
