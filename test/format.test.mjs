import assert from "node:assert/strict";
import test from "node:test";
import { formatProfileText, formatSearchResultsText } from "../src/lib/format.mjs";

const profile = {
  name: "Harshdip Saha",
  role: "UG researcher, NexGenLab NSUT",
  location: "New Delhi, India",
  bio: "Machine-learning researcher in medical brain imaging.",
  email: "harshdipsaha@gmail.com",
  github: "https://github.com/HARSHDIPSAHA",
  linkedin: "https://www.linkedin.com/in/harshdip-saha",
  resume: "https://harshdipsaha.tech/resume.pdf",
  siteUrl: "https://harshdipsaha.tech/",
  skills: ["Python", "PyTorch", "TypeScript"],
};

const projects = [
  {
    slug: "recap-net",
    title: "RECAP-Net",
    summary: "Classifying glioblastoma response from paired MRI scans.",
    year: "2025",
    url: "https://harshdipsaha.tech/projects/recap-net",
  },
];

test("formatProfileText includes the bio, role, and every skill", () => {
  const text = formatProfileText(profile);
  assert.ok(text.includes(profile.bio));
  assert.ok(text.includes(profile.role));
  for (const skill of profile.skills) assert.ok(text.includes(skill));
  assert.ok(text.includes(profile.resume));
  assert.ok(text.includes(profile.github));
});

test("formatSearchResultsText lists one line per project", () => {
  const text = formatSearchResultsText(projects, "glioblastoma");
  assert.ok(text.includes("RECAP-Net"));
  assert.ok(text.includes("2025"));
  assert.ok(text.includes("https://harshdipsaha.tech/projects/recap-net"));
});

test("formatSearchResultsText names the query when nothing matches", () => {
  const text = formatSearchResultsText([], "zzz-no-such-project-zzz");
  assert.equal(text, 'No projects match "zzz-no-such-project-zzz".');
});
