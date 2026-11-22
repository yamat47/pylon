// What CareerList works out from a company's roles.
import { period } from "./dates.ts";
import type { Company, Role } from "./types.ts";

// The time at a company: from the start of its first role, the last given, to the end of its
// latest, the first given.
export function tenure(company: Company): string {
  const [latest] = company.roles;
  const first = company.roles.at(-1) ?? latest;
  return period(first.start, latest.end);
}

// Whether the person is still in a role: one that has not ended.
export const goesOn = (role: Role) => role.end === undefined;
