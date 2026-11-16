import type { IndexGroup } from "./types.ts";

type IndexListProps = {
  // In the order to show them.
  groups: readonly IndexGroup[];
};

const FIGURE = "py-muted text-figure";

export function IndexList({ groups }: IndexListProps) {
  return (
    <div>
      {groups.map((group) => (
        <section className="py-index-list-group" key={group.label}>
          <h2 className="py-index-list-label py-muted text-label">{group.label}</h2>
          <ul className="py-index-list-items">
            {group.items.map((item) => (
              <li className="py-index-list-item" key={item.href}>
                {item.dateTime === undefined ? (
                  <span className={FIGURE}>{item.figure}</span>
                ) : (
                  <time className={FIGURE} dateTime={item.dateTime}>
                    {item.figure}
                  </time>
                )}
                <a className="py-plain-link py-phrases text-entry" href={item.href}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
