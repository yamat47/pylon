import { fullDate } from "./dates.ts";

type LinkCardProps = {
  href: string;
  title: string;
  description?: string | undefined;
  // The name of the site the page is on.
  site: string;
  // The day the linked page was published, as YYYY-MM-DD, when it is known.
  date?: string | undefined;
  // The address of a thumbnail, usually on the linked page's own site.
  image?: string | undefined;
};

export function LinkCard({ href, title, description, site, date, image }: LinkCardProps) {
  return (
    <a className="py-link-card py-plain-link" href={href}>
      <span className="py-link-card-body">
        <span className="py-link-card-clamp text-entry">{title}</span>
        {description === undefined ? null : (
          <span className="py-link-card-clamp py-muted text-small">{description}</span>
        )}
        <span className="py-link-card-site py-muted text-small">
          {date === undefined ? site : `${site} · ${fullDate(date)}`}
        </span>
      </span>
      {image === undefined ? null : (
        // Decoration: the title says what the card is. No referrer is sent, so the other site
        // does not learn which page a reader has open.
        <img
          className="py-link-card-image"
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      )}
    </a>
  );
}
