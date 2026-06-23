import { log } from "@clack/prompts";
import { join } from "node:path";

import { writeFile } from "@/lib/fs/write-file";

export async function createPackageJson({
  workingDirectory,
  packageName,
}: {
  workingDirectory: string;
  packageName: string;
}) {
  const content = `
{
  "name": "${packageName}",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "bun run --bun vite dev",
    "check-types": "tsc --noEmit",
    "lint": "eslint --cache",
    "lint:fix": "eslint --fix --cache",
    "format": "prettier . --write --cache",
    "format:check": "prettier . --check --cache",
    "check": "bun run check-types && bun run lint && bun run format:check",
    "fix": "bun run lint:fix && bun run format"
  },
  "packageManager": "bun@${Bun.version}"
}
`;

  const writeFileResult = await writeFile(
    join(workingDirectory, "package.json"),
    content
  );

  if (!writeFileResult.success) {
    log.error(writeFileResult.error.message);
    process.exit(1);
  }
}
