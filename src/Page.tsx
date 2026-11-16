import type { ReactNode } from "react";

type PageProps = {
  header: ReactNode;
  footer: ReactNode;
  // How wide the content is: `wide` as the header for an index, `text` as a column to read.
  width: "wide" | "text";
  children: ReactNode;
};

export function Page({ header, footer, width, children }: PageProps) {
  return (
    <div className="py-page">
      {header}
      <main className={`py-page-main py-page-main-${width}`}>{children}</main>
      {footer}
    </div>
  );
}
