import { type Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "About | Digital Wardrobe",
  description: "About Digital Wardrobe - Organize your clothes digitally",
};

const technologies = [
  {
    category: "Frontend",
    items: [
      "Next.js App Router",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Clerk Auth",
      "uploadthing",
      "Shadcn",
      "dnd kit",
    ],
  },
  {
    category: "Backend",
    items: ["PostgreSQL (Neon)", "Drizzle ORM", "React Server Components"],
  },
  {
    category: "Other",
    items: [
      "Figma (Site Design and Icons)",
      "Google Fonts",
      "Cursor",
      "ESLint",
      "Prettier",
    ],
  },
];

const AboutPage = () => {
  return (
    <div className="container-page">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-silkscreen text-3xl">About</h1>

        <section className="mb-12">
          <h2 className="mb-4 font-chakra text-xl font-semibold">Motivation</h2>
          <div className="flex flex-col gap-4 font-chakra text-zinc-600">
            <p>
              I love digitally tracking and organizing many parts of my life. I
              save interesting places I&apos;ve been or want to go on Google
              Maps, rank which restaurants I like the most on Beli, and have
              dozens of Notion pages for every little thing in my life. Good UX
              from other organization apps, along with the sense of
              accomplishment, actually makes the manual labor of organizing data
              fun.
            </p>
            <p>
              I&apos;m sure there are websites or apps out there that can be
              used to organize clothes, but I didn&apos;t know of any. I took
              the opportunity to build my own digital wardrobe, so that I can
              learn what makes or breaks a user experience.
            </p>
            <p>
              <b>Warning:</b> This website was not made to make money. I am
              using the free tier of many services, and may need to shut down
              the website without warning. Although I welcome you to create an
              account and upload images, please do so with the understanding
              that your data may be deleted at any time.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-chakra text-xl font-semibold">
            Inspiration
          </h2>
          <div className="flex flex-col gap-4 font-chakra text-zinc-600">
            <p>
              I wanted to try something new with the theme of this website, and
              went for a more retro, low-res look that still felt modern. I took
              heavy inspiration from{" "}
              <Link href="https://www.grailed.com/" className="font-semibold">
                Grailed
              </Link>{" "}
              for design cues, alongside{" "}
              <Link href="https://www.goat.com/" className="font-semibold">
                GOAT
              </Link>{" "}
              and{" "}
              <Link href="https://www.notion.com/" className="font-semibold">
                Notion
              </Link>{" "}
              for UX inspiration.
            </p>
            <p>
              I also got ideas from the fit grids that are posted on Tiktok and
              Instagram, for the "Fit Check" feature.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-chakra text-xl font-semibold">Tech</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <div
                key={tech.category}
                className="border-3 border-zinc-300 bg-white p-4"
              >
                <h3 className="mb-3 font-chakra text-lg font-semibold">
                  {tech.category}
                </h3>
                <ul className="flex flex-col gap-2">
                  {tech.items.map((item) => (
                    <li
                      key={item}
                      className="font-chakra text-sm text-zinc-600"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
