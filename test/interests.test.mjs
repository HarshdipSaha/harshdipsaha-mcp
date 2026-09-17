import assert from "node:assert/strict";
import test from "node:test";
import { INTERESTS, withInterests } from "../src/lib/interests.mjs";

const base = { name: "Harshdip Saha", skills: [] };

test("withInterests adds the server's own interests when the site data has none", () => {
  const profile = withInterests(base);
  assert.deepEqual(profile.interests, INTERESTS);
  assert.equal(profile.name, "Harshdip Saha");
});

test("withInterests prefers interests the site data already provides", () => {
  const fromSite = [{ topic: "X", pursuit: "Y" }];
  assert.deepEqual(withInterests({ ...base, interests: fromSite }).interests, fromSite);
});

test("withInterests does not mutate its input", () => {
  withInterests(base);
  assert.equal("interests" in base, false);
});

test("the LLM safety interest mentions the ETH Zurich collaboration and Apertus", () => {
  const safety = INTERESTS.find((i) => /safety/i.test(i.topic));
  assert.ok(safety);
  assert.match(safety.pursuit, /ETH Zurich professors/);
  assert.match(safety.pursuit, /Apertus/);
});
