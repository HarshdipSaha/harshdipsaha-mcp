/**
 * Human-readable `content` text for the two tools — the string an agent
 * reads and can quote back to whoever's asking. No structured/JSON shaping
 * here; that's what `structuredContent` on the tool response is for.
 */

/** @typedef {import("./types.mjs").AgentProject} AgentProject */
/** @typedef {import("./types.mjs").Profile} Profile */

/**
 * @param {Profile} profile
 * @returns {string}
 */
export function formatProfileText(profile) {
  return [
    `${profile.name} — ${profile.role}, ${profile.location}.`,
    profile.bio,
    `Skills: ${profile.skills.join(", ")}.`,
    `GitHub: ${profile.github}`,
    `LinkedIn: ${profile.linkedin}`,
    `Résumé: ${profile.resume}`,
    `Site: ${profile.siteUrl}`,
    `Email: ${profile.email}`,
  ].join("\n");
}

/**
 * @param {AgentProject[]} results
 * @param {string} query
 * @returns {string}
 */
export function formatSearchResultsText(results, query) {
  if (results.length === 0) return `No projects match ${JSON.stringify(query)}.`;
  return results.map((p) => `${p.title} (${p.year}) — ${p.summary} ${p.url}`).join("\n");
}
