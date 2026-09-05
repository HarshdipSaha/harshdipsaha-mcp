import { createMcpHandler } from "agents/mcp/server";
import { createServer } from "./server.mjs";

/**
 * Public, unauthenticated, stateless MCP server — Cloudflare's Agents SDK
 * wraps createServer() as a Streamable HTTP Worker fetch handler. See
 * docs/plans/2026-09-05-mcp-server-design.md in HARSHDIPSAHA.github.io for
 * why: no auth (public read-only data), no per-session state (the MCP spec's
 * 2026-07-28 revision made the protocol fully stateless, and neither tool
 * here needs conversation memory).
 */
const handler = createMcpHandler(createServer);

export default {
  fetch: handler,
};
