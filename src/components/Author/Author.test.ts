import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect, beforeEach } from "vitest";
import Author from "./Author.astro";

describe("Author Component", () => {
  let container: AstroContainer;

  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  describe("Basic rendering", () => {
    it("renders author name", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain("Antonio Masiá");
    });

    it("renders author bio", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain("Full Stack Web Developer");
    });

    it("renders author avatar", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain('src="/images/avatars/ajmasia.jpg"');
      expect(result).toContain('alt="Antonio Masiá"');
    });
  });

  describe("Social links", () => {
    it("renders LinkedIn link", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain('href="https://linkedin.com/in/ajmasia"');
      expect(result).toContain('aria-label="LinkedIn"');
    });

    it("renders GitHub link", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain('href="https://github.com/ajmasia"');
      expect(result).toContain('aria-label="GitHub"');
    });

    it("renders Twitter link", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain('href="https://twitter.com/ajmasia"');
      expect(result).toContain('aria-label="Twitter"');
    });

    it("opens social links in new tab", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain('target="_blank"');
      expect(result).toContain('rel="noopener noreferrer"');
    });
  });

  describe("Accessibility", () => {
    it("has proper image alt text", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain('alt="Antonio Masiá"');
    });

    it("has aria-labels on social links", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain('aria-label="LinkedIn"');
      expect(result).toContain('aria-label="GitHub"');
      expect(result).toContain('aria-label="Twitter"');
    });
  });

  describe("Structure", () => {
    it("renders inside an aside element", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain("<aside");
    });

    it("renders author name in h3", async () => {
      const result = await container.renderToString(Author, {
        props: { authorId: "ajmasia" },
      });

      expect(result).toContain("<h3");
      expect(result).toContain("Antonio Masiá");
    });
  });
});
