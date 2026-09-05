/**
 * Fetches agent-data.json from the live portfolio site. Relies on Cloudflare's
 * edge cache (the `cf.cacheTtl` fetch option) so a burst of MCP traffic never
 * hits the GitHub Pages origin more than once per TTL window — see the design
 * doc (docs/plans/2026-09-05-mcp-server-design.md in HARSHDIPSAHA.github.io).
 *
 * Not unit-tested here: `cf.cacheTtl` is a Workers-only fetch extension with
 * no meaningful behavior under plain Node. Exercised instead via `wrangler
 * dev` (see README).
 */

const AGENT_DATA_URL = "https://harshdipsaha.tech/agent-data.json";
const CACHE_TTL_SECONDS = 600;

/**
 * @returns {Promise<import("./types.mjs").AgentData>}
 */
export async function fetchAgentData() {
  const response = await fetch(AGENT_DATA_URL, {
    cf: { cacheTtl: CACHE_TTL_SECONDS, cacheEverything: true },
  });
  if (!response.ok) {
    throw new Error(`agent-data.json fetch failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
