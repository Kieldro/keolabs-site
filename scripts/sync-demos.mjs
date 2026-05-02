#!/usr/bin/env node
// Sync src/data/demos.json from the sibling voice-agent repo's clients/.
//
// Why: src/pages/index.astro auto-detects clients/ at build time when
// the sibling repo is co-located, but falls back to demos.json in CI
// environments (Cloudflare Pages, GitHub Actions) where voice-agent
// isn't on the filesystem. This script keeps that fallback fresh.
//
// Run after adding/removing/renaming a client in voice-agent:
//   npm run sync:demos
//
// Or wire to a git pre-commit hook in voice-agent that triggers this
// in the sibling site repo. Future improvement: have voice-agent CI
// publish demos.json to a CF Worker endpoint and have Astro fetch it
// at build time, eliminating this manual mirror.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientsDir = path.resolve(__dirname, '../../voice-agent/clients');
const out = path.resolve(__dirname, '../src/data/demos.json');

if (!fs.existsSync(clientsDir)) {
  console.error(`voice-agent not found at ${clientsDir} — nothing to sync`);
  process.exit(1);
}

const profiles = [];
for (const e of fs.readdirSync(clientsDir, { withFileTypes: true })) {
  if (!e.isDirectory() || e.name.startsWith('_')) continue;
  const cfgPath = path.join(clientsDir, e.name, 'config.yaml');
  if (!fs.existsSync(cfgPath)) continue;
  const cfg = yaml.load(fs.readFileSync(cfgPath, 'utf8'));
  if (cfg?.client_id && cfg?.display_name) {
    profiles.push({ slug: cfg.client_id, name: cfg.display_name });
  }
}
profiles.sort((a, b) => a.name.localeCompare(b.name));
fs.writeFileSync(out, JSON.stringify(profiles, null, 2) + '\n');
console.log(`synced ${profiles.length} profile(s) -> ${path.relative(process.cwd(), out)}`);
for (const p of profiles) console.log(`  ${p.slug.padEnd(28)} ${p.name}`);
