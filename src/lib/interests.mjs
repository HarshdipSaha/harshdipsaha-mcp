/**
 * Research interests, and how each is being pursued. Lives here rather than in
 * the portfolio's agent-data.json on purpose: it's MCP-only copy, so it doesn't
 * need a site rebuild to change. If agent-data.json ever ships its own
 * `interests`, that wins (see withInterests).
 */

/** @type {import("./types.mjs").Interest[]} */
export const INTERESTS = [
  {
    topic: "LLM safety (how fine-tuning erodes safety alignment)",
    pursuit:
      "Collaborating with ETH Zurich professors on an LLM safety project for the past 3 months. " +
      "Fine-tuned Apertus-8B (the fully open Swiss LLM) on ordinary doctor-patient dialogue and found its safety behaviour shifted: " +
      "it endorsed a dangerous remedy the base model had refused, and invented a fake doctor persona on another prompt. " +
      "Now building a pre-registered plan that trains crosscoders across his own fine-tuning checkpoints to locate when, " +
      "and in which layer, the refusal mechanism loses its causal grip, with a matched non-medical control fine-tune.",
  },
  {
    topic: "Medical brain imaging (longitudinal analysis and registration)",
    pursuit:
      "RECAP-Net placed 3rd worldwide in the BraTS Lighthouse 2025 progression challenge and was presented orally at MICCAI 2025. " +
      "Core contributor to the open-source BrainGlobe project, working on atlas-to-brain registration (15+ merged PRs).",
  },
];

/**
 * @template {object} P
 * @param {P & { interests?: import("./types.mjs").Interest[] }} profile
 * @returns {P & { interests: import("./types.mjs").Interest[] }}
 */
export function withInterests(profile) {
  return { ...profile, interests: profile.interests ?? INTERESTS };
}
