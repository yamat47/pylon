import { goesOn, tenure } from "./career-list.ts";
import { period } from "./dates.ts";
import { Text } from "./Text.tsx";
import type { Company } from "./types.ts";

type CareerListProps = {
  // The latest first.
  companies: readonly Company[];
  // True where the list is a few lines of a page about more, as on the top page: each company
  // once, with its time there and its latest role.
  brief?: boolean | undefined;
};

// A row beside the line, in the accent while what it stands for goes on.
const along = (going: boolean) => `py-career-row${going ? " py-career-row-current" : ""}`;

export function CareerList({ companies, brief = false }: CareerListProps) {
  if (brief) {
    return (
      <ol className="py-career-brief">
        {companies.map((company) => (
          <li className={along(goesOn(company.roles[0]))} key={company.name}>
            <span className="py-muted text-figure">{tenure(company)}</span>
            <span className="text-subheading">{company.name}</span>
            <span className="py-muted text-small">{company.roles[0].title}</span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <div className="py-career-list">
      {companies.map((company) => (
        <section key={company.name}>
          <div className="py-career-company">
            <h2 className="py-text py-phrases text-heading">{company.name}</h2>
            <span className="py-muted text-figure">{tenure(company)}</span>
          </div>
          <ol className="py-career-roles">
            {company.roles.map((role) => (
              <li className={along(goesOn(role))} key={`${role.start} ${role.title}`}>
                <Text variant="figure" tone="muted">
                  {period(role.start, role.end)}
                </Text>
                <h3 className="py-text py-phrases text-subheading">{role.title}</h3>
                {role.text === undefined ? null : (
                  <p className="py-career-role-text py-text">{role.text}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
