import { dataAttributes } from "./data-attributes.ts";
import { fullDate } from "./dates.ts";
import type { DataAttributes } from "./types.ts";

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
  // Written on the card's link, for the site's own tools: the mark that keeps a card out of a
  // search index, for one.
  linkAttributes?: DataAttributes | undefined;
};

export function LinkCard({
  href,
  title,
  description,
  site,
  date,
  image,
  linkAttributes,
}: LinkCardProps) {
  return (
    <a className="py-link-card py-plain-link" href={href} {...dataAttributes(linkAttributes)}>
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
