import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { fetchAgentData } from "./lib/agent-data-client.mjs";
import { formatProfileText, formatSearchResultsText } from "./lib/format.mjs";
import { withInterests } from "./lib/interests.mjs";
import { searchProjects } from "./lib/search-projects.mjs";

const PROJECT_SCHEMA = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  year: z.string(),
  url: z.string(),
  code: z.string().optional(),
});

const PROFILE_SCHEMA = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string(),
  bio: z.string(),
  email: z.string(),
  github: z.string(),
  linkedin: z.string(),
  resume: z.string(),
  siteUrl: z.string(),
  skills: z.array(z.string()),
  interests: z.array(z.object({ topic: z.string(), pursuit: z.string() })),
});

const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

/**
 * Two tools, deliberately — the same minimal-surface philosophy ADR 0014
 * used for the WebMCP `searchProjects` tool on the portfolio site: each is a
 * schema that must stay correct, and these two answer everything the design
 * doc (issue #62) scoped in.
 */
export function createServer() {
  const server = new McpServer({ name: "harshdipsaha-mcp", version: "1.0.0" });

  server.registerTool(
    "searchProjects",
    {
      title: "Search projects",
      description:
        "Search Harshdip Saha's projects by keyword and return matching titles, summaries, years and case-study URLs. Covers exactly the projects listed on harshdipsaha.tech/projects.",
      inputSchema: z.object({
        query: z
          .string()
          .describe(
            "Keywords to match against project titles and summaries, e.g. 'medical imaging'. Pass an empty string to list every project.",
          ),
        limit: z
          .number()
          .int()
          .default(10)
          .describe("Maximum number of projects to return (1-50; out-of-range values are clamped, not rejected)."),
      }),
      outputSchema: z.object({
        query: z.string(),
        count: z.number(),
        results: z.array(PROJECT_SCHEMA),
      }),
      annotations: READ_ONLY,
    },
    async ({ query, limit }) => {
      // Clamp rather than reject — matches the leniency of the portfolio's
      // WebMCP searchProjects, so a slightly out-of-range value from a
      // calling agent still gets a useful result instead of a hard error.
      const clampedLimit = Math.min(50, Math.max(1, limit));
      const { projects } = await fetchAgentData();
      const results = searchProjects(projects, query, clampedLimit);
      return {
        content: [{ type: "text", text: formatSearchResultsText(results, query) }],
        structuredContent: { query, count: results.length, results },
      };
    },
  );

  server.registerTool(
    "getProfile",
    {
      title: "Get profile",
      description:
        "Return Harshdip Saha's bio, skills, research interests (and how he is pursuing each one), contact info, résumé link and site URL. Use this for questions about his interests, background, or how to reach him.",
      inputSchema: z.object({}),
      outputSchema: PROFILE_SCHEMA,
      annotations: READ_ONLY,
    },
    async () => {
      const profile = withInterests((await fetchAgentData()).profile);
      return {
        content: [{ type: "text", text: formatProfileText(profile) }],
        structuredContent: profile,
      };
    },
  );

  return server;
}
