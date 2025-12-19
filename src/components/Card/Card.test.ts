import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect, beforeEach } from "vitest";
import Card from "./Card.astro";

// Mock post data
const mockPost = {
  slug: "test-post",
  data: {
    title: "Test Post Title",
    description: "This is a test description for the post",
    date: new Date("2024-01-15"),
    tags: ["javascript", "testing"],
    heroImage: "/images/test-hero.jpg",
    draft: false,
    lang: "es",
  },
  body: "This is the body content of the post for reading time calculation.",
};

describe("Card Component", () => {
  let container: AstroContainer;

  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  describe("Basic rendering", () => {
    it("renders the post title", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain("Test Post Title");
    });

    it("renders the post description", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain("This is a test description for the post");
    });

    it("renders the post link with correct href", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain('href="/blog/test-post"');
    });

    it("renders tags", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain("javascript");
      expect(result).toContain("testing");
    });

    it("renders the formatted date in Spanish", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain("15");
      expect(result).toContain("enero");
      expect(result).toContain("2024");
    });
  });

  describe("Variant prop", () => {
    it("renders vertical variant by default", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      // Vertical variant should NOT have horizontal-specific classes
      expect(result).not.toContain("xl:max-h-[210px]");
    });

    it("renders horizontal variant with correct classes", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost, variant: "horizontal" },
      });

      expect(result).toContain("xl:max-h-[210px]");
      expect(result).toContain("xl:flex");
    });

    it("applies line-clamp to description in horizontal variant", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost, variant: "horizontal" },
      });

      expect(result).toContain("line-clamp-2");
    });
  });

  describe("showImage prop", () => {
    it("renders hero image when showImage is true", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost, showImage: true },
      });

      expect(result).toContain('src="/images/test-hero.jpg"');
    });

    it("does not render hero image when showImage is false", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost, showImage: false },
      });

      expect(result).not.toContain('src="/images/test-hero.jpg"');
    });

    it("does not render image when post has no heroImage", async () => {
      const postWithoutImage = {
        ...mockPost,
        data: { ...mockPost.data, heroImage: undefined },
      };

      const result = await container.renderToString(Card, {
        props: { post: postWithoutImage, showImage: true },
      });

      expect(result).not.toContain("<img");
    });
  });

  describe("headingLevel prop", () => {
    it("renders h2 by default", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain("<h2");
    });

    it("renders h3 when specified", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost, headingLevel: "h3" },
      });

      expect(result).toContain("<h3");
    });
  });

  describe("Stretched link pattern", () => {
    it("has card-link class on the title link", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain("card-link");
    });

    it("has card-tags class for clickable tags", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain("card-tags");
    });

    it("has relative positioning on article", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost },
      });

      expect(result).toContain("relative");
    });
  });

  describe("Custom class prop", () => {
    it("applies custom class to article", async () => {
      const result = await container.renderToString(Card, {
        props: { post: mockPost, class: "custom-class mb-8" },
      });

      expect(result).toContain("custom-class");
      expect(result).toContain("mb-8");
    });
  });

  describe("Post without optional fields", () => {
    it("renders without description", async () => {
      const postWithoutDescription = {
        ...mockPost,
        data: { ...mockPost.data, description: undefined },
      };

      const result = await container.renderToString(Card, {
        props: { post: postWithoutDescription },
      });

      expect(result).toContain("Test Post Title");
    });

    it("renders without tags", async () => {
      const postWithoutTags = {
        ...mockPost,
        data: { ...mockPost.data, tags: [] },
      };

      const result = await container.renderToString(Card, {
        props: { post: postWithoutTags },
      });

      expect(result).toContain("Test Post Title");
      expect(result).not.toContain("card-tags");
    });
  });
});
