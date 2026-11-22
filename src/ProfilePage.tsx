import type { ReactNode } from "react";
import type { Language } from "./types.ts";

type ProfilePageProps = {
  // The page's language. English text is set on the shorter line of `text-body-latin`.
  lang: Language;
  // The profile column, a ProfileAside.
  aside: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function ProfilePage({ lang, aside, footer, children }: ProfilePageProps) {
  const body = lang === "en" ? "text-body-latin" : "text-body";
  return (
    <div className={`py-frame ${body}`} lang={lang}>
      <div className="py-frame-body">
        <div className="py-profile-page">
          {aside}
          <main className="py-profile-page-main">{children}</main>
        </div>
      </div>
      {footer}
    </div>
  );
}
