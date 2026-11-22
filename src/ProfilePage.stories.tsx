import type { Meta, StoryObj } from "@storybook/react-vite";
import { AboutSection } from "./AboutSection.tsx";
import { CareerList } from "./CareerList.tsx";
import { portfolio } from "./fixtures.ts";
import { Introduction } from "./Introduction.tsx";
import { PageHeader } from "./PageHeader.tsx";
import { Picture } from "./Picture.tsx";
import { ProfileAside } from "./ProfileAside.tsx";
import readme from "./ProfilePage.md?raw";
import { ProfilePage } from "./ProfilePage.tsx";
import { ProjectGrid } from "./ProjectGrid.tsx";
import { Prose } from "./Prose.tsx";
import { Section } from "./Section.tsx";
import { SiteFooter } from "./SiteFooter.tsx";
import { TalkFeature } from "./TalkFeature.tsx";
import { TalkList } from "./TalkList.tsx";
import { WritingList } from "./WritingList.tsx";

const { en, ja } = portfolio;

const meta = {
  title: "Pages/ProfilePage",
  component: ProfilePage,
  parameters: { docs: { description: { component: readme } }, card: { frame: "page" } },
  args: {
    lang: "en",
    aside: <ProfileAside {...en.profile} pages={en.pages()} heading />,
    footer: <SiteFooter {...en.footer()} />,
  },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// The top page: the introduction, then a few of each list under its heading.
export const TopPage: Story = {
  args: {
    children: (
      <>
        <Introduction lang="en" more={en.top.more}>
          {en.top.introduction}
        </Introduction>
        <Section {...en.top.projects}>
          <ProjectGrid projects={en.projects.slice(0, 4)} titleAs="h3" />
        </Section>
        <Section {...en.top.talks}>
          <TalkFeature talk={en.talks[0]} titleAs="h3" />
          <TalkList talks={en.talks.slice(1, 3)} titleAs="h3" />
        </Section>
        <Section {...en.top.writing}>
          <WritingList articles={en.articles.slice(0, 5)} />
        </Section>
        <Section {...en.top.career}>
          <CareerList companies={en.companies} brief />
        </Section>
        <Section title={en.top.contact.title}>
          <Prose>
            <p>{en.top.contact.text}</p>
          </Prose>
        </Section>
      </>
    ),
  },
};

// The same page in Japanese.
export const TopPageInJapanese: Story = {
  args: {
    lang: "ja",
    aside: <ProfileAside {...ja.profile} pages={ja.pages()} heading />,
    footer: <SiteFooter {...ja.footer()} />,
    children: (
      <>
        <Introduction lang="ja" more={ja.top.more}>
          {ja.top.introduction}
        </Introduction>
        <Section {...ja.top.projects}>
          <ProjectGrid projects={ja.projects.slice(0, 4)} titleAs="h3" />
        </Section>
        <Section {...ja.top.talks}>
          <TalkFeature talk={ja.talks[0]} titleAs="h3" />
          <TalkList talks={ja.talks.slice(1, 3)} titleAs="h3" />
        </Section>
        <Section {...ja.top.writing}>
          <WritingList articles={ja.articles.slice(0, 5)} />
        </Section>
        <Section {...ja.top.career}>
          <CareerList companies={ja.companies} brief />
        </Section>
      </>
    ),
  },
};

export const ProjectsPage: Story = {
  args: {
    aside: <ProfileAside {...en.profile} pages={en.pages("projects")} />,
    footer: <SiteFooter {...en.footer("projects")} />,
    children: (
      <>
        <PageHeader title={en.titles.projects} count={en.projects.length} />
        <ProjectGrid projects={en.projects} />
      </>
    ),
  },
};

export const TalksPage: Story = {
  args: {
    aside: <ProfileAside {...en.profile} pages={en.pages("talks")} />,
    footer: <SiteFooter {...en.footer("talks")} />,
    children: (
      <>
        <PageHeader title={en.titles.talks} count={en.talks.length} />
        <TalkFeature talk={en.talks[0]} />
        <TalkList talks={en.talks.slice(1)} />
      </>
    ),
  },
};

// The page of writing, in Japanese.
export const WritingPage: Story = {
  args: {
    lang: "ja",
    aside: <ProfileAside {...ja.profile} pages={ja.pages("writing")} />,
    footer: <SiteFooter {...ja.footer("writing")} />,
    children: (
      <>
        <PageHeader title={ja.titles.writing} count={ja.articles.length} />
        <WritingList articles={ja.articles} grouped />
      </>
    ),
  },
};

export const CareerPage: Story = {
  args: {
    aside: <ProfileAside {...en.profile} pages={en.pages("career")} />,
    footer: <SiteFooter {...en.footer("career")} />,
    children: (
      <>
        <PageHeader title={en.titles.career} />
        <CareerList companies={en.companies} />
      </>
    ),
  },
};

export const AboutPage: Story = {
  args: {
    aside: <ProfileAside {...en.profile} pages={en.pages("about")} />,
    footer: <SiteFooter {...en.footer("about")} />,
    children: (
      <>
        <PageHeader title={en.titles.about} />
        <Introduction lang="en">{en.about.introduction}</Introduction>
        <Picture ratio="3:2" />
        {en.about.sections.map((section) => (
          <AboutSection key={section.title} title={section.title} links={section.links}>
            <p>{section.text}</p>
          </AboutSection>
        ))}
      </>
    ),
  },
};
