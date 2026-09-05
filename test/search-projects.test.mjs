import assert from "node:assert/strict";
import test from "node:test";
import { searchProjects } from "../src/lib/search-projects.mjs";

/**
 * Same matching semantics as HARSHDIPSAHA.github.io's WebMCP searchProjects
 * (src/components/agent/WebMcpTools.tsx): every whitespace-separated query
 * term must appear somewhere in title/summary/slug/year, case-insensitive.
 */

const projects = [
  {
    slug: "recap-net",
    title: "RECAP-Net",
    summary: "Classifying glioblastoma response from paired MRI scans.",
    year: "2025",
    url: "https://harshdipsaha.tech/projects/recap-net",
    code: "https://github.com/HARSHDIPSAHA/brats_response_project",
  },
  {
    slug: "atomnet",
    title: "AtoM-Net",
    summary: "Atomic force microscopy image segmentation.",
    year: "2025",
    url: "https://harshdipsaha.tech/projects/atomnet",
  },
  {
    slug: "loan-chatbot",
    title: "Agentic Loan Assistant Chatbot",
    summary: "An LLM agent that walks a user through a loan application.",
    year: "2024",
    url: "https://harshdipsaha.tech/projects/loan-chatbot",
    code: "https://github.com/HARSHDIPSAHA/loan-chatbot",
  },
];

test("matches every whitespace-separated term against title/summary/slug/year, case-insensitively", () => {
  const results = searchProjects(projects, "MRI glioblastoma", 10);
  assert.deepEqual(results.map((p) => p.slug), ["recap-net"]);
});

test("returns every project when the query is empty", () => {
  assert.equal(searchProjects(projects, "", 10).length, 3);
});

test("respects limit", () => {
  assert.equal(searchProjects(projects, "", 2).length, 2);
});

test("returns an empty array when nothing matches", () => {
  assert.deepEqual(searchProjects(projects, "zzz-no-such-project-zzz", 10), []);
});

test("matches on year", () => {
  const results = searchProjects(projects, "2024", 10);
  assert.deepEqual(results.map((p) => p.slug), ["loan-chatbot"]);
});

test("does not mutate the input array", () => {
  const before = JSON.stringify(projects);
  searchProjects(projects, "net", 10);
  assert.equal(JSON.stringify(projects), before);
});
