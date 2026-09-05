/**
 * Same matching semantics as HARSHDIPSAHA.github.io's WebMCP `searchProjects`
 * (src/components/agent/WebMcpTools.tsx) — kept in sync by hand, see the
 * repo's README. Every whitespace-separated query term must appear somewhere
 * in the project's title, summary, slug, or year, case-insensitively.
 */

/** @typedef {import("./types.mjs").AgentProject} AgentProject */

/**
 * @param {AgentProject[]} projects
 * @param {string} query
 * @param {number} limit
 * @returns {AgentProject[]}
 */
export function searchProjects(projects, query, limit) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = terms.length
    ? projects.filter((p) => {
        const hay = `${p.title} ${p.summary} ${p.slug} ${p.year}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
    : projects;
  return matches.slice(0, limit);
}
