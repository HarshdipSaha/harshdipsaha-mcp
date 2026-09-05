/**
 * Mirrors HARSHDIPSAHA.github.io's scripts/lib/agent-data.mjs output exactly —
 * this server is a thin protocol adapter over that JSON, not a second copy of
 * the copy. Keep in sync by hand; there is no shared package between the two
 * repos (see README "Keeping this in sync"). Type-only module — no runtime
 * exports.
 *
 * @typedef {object} AgentProject
 * @property {string} slug
 * @property {string} title
 * @property {string} summary
 * @property {string} year
 * @property {string} url
 * @property {string} [code]
 *
 * @typedef {object} Profile
 * @property {string} name
 * @property {string} role
 * @property {string} location
 * @property {string} bio
 * @property {string} email
 * @property {string} github
 * @property {string} linkedin
 * @property {string} resume
 * @property {string} siteUrl
 * @property {string[]} skills
 *
 * @typedef {object} AgentData
 * @property {Profile} profile
 * @property {AgentProject[]} projects
 */
export {};
