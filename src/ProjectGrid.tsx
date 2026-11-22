import { period } from "./dates.ts";
import { LinkList } from "./LinkList.tsx";
import { Picture } from "./Picture.tsx";
import { Text } from "./Text.tsx";
import type { Project } from "./types.ts";

type ProjectGridProps = {
  // In the order to show them.
  projects: readonly Project[];
  // The element of each project's name: `h2` where the grid is the page's content, under its h1,
  // and `h3` in a Section, under its heading.
  titleAs?: "h2" | "h3" | undefined;
};

export function ProjectGrid({ projects, titleAs = "h2" }: ProjectGridProps) {
  return (
    <ul className="py-project-grid">
      {projects.map((project) => (
        <li className="py-project" key={project.name}>
          <Picture image={project.screenshot} ratio="16:10" />
          <div className="py-project-head">
            <Text variant="subheading" as={titleAs}>
              {project.name}
            </Text>
            <span className="py-muted text-figure">{period(project.start, project.end)}</span>
          </div>
          <Text variant="small" tone="muted">
            {project.description}
          </Text>
          <LinkList links={project.links} />
        </li>
      ))}
    </ul>
  );
}
