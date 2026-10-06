import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const faq = z.object({ q: z.string(), a: z.string().min(40) });

const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      kind: z.enum(['hub', 'service']),
      category: z.enum(['safety-nets', 'sports-nets', 'invisible-grills', 'cloth-hangers']),
      title: z.string(), // H1
      name: z.string(), // short name
      seoTitle: z.string().max(60),
      description: z.string().min(70).max(160),
      answer: z.string().min(150).max(420), // answer box, the snippet / AI-citation target
      hero: image(),
      heroAlt: z.string().min(15),
      uses: z.array(z.string()).min(1),
      problems: z.array(z.string()).min(1),
      installSteps: z.array(z.string()).default([]),
      priceFactors: z.array(z.string()).default([]),
      priceRange: z.string().nullable().default(null), // D4: null hides
      material: z.string().nullable().default(null), // D11: null hides
      alsoAvailable: z.array(z.string()).default([]), // hubs only
      faqs: z.array(faq).default([]),
      related: z.array(reference('services')).default([]),
      legacyUrls: z.array(z.string().regex(/^\/.*\.php$/)).default([]),
      order: z.number(),
    }),
});

const areas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/areas' }),
  schema: z.object({
    name: z.string(),
    localNotes: z.string().default(''), // real experience; >= 60 words to publish combo pages
    landmarks: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      area: reference('areas'),
      services: z.array(reference('services')).min(1),
      photos: z.array(z.object({ src: image(), alt: z.string().min(15) })).min(1),
      propertyType: z.string().optional(), // e.g. 3BHK apartment, villa, office
      problem: z.string().optional(),
      solution: z.string().optional(),
      before: image().optional(),
      after: image().optional(),
    }),
});

const guides = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/guides' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seoTitle: z.string().max(60),
      description: z.string().min(70).max(160),
      answer: z.string().min(150).max(420),
      hero: image(),
      heroAlt: z.string(),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      services: z.array(reference('services')).min(1),
    }),
});

export const collections = { services, areas, projects, guides };
