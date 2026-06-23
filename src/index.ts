#!/usr/bin/env bun

import { isCancel, cancel, intro, outro, text } from "@clack/prompts";
import { basename } from "node:path";
import { cwd } from "node:process";
import { z } from "zod";

import { resolveRealPath } from "@/operations/resolve-real-path";
import { getStats } from "@/operations/get-stats";
import { CURRENT_DIRECTORY } from "@/constants";

intro("Gravity is ready. Time to forge a star.");

const targetDirectory = await text({
  message: "Where will the star be born?",
  placeholder: CURRENT_DIRECTORY,
  defaultValue: CURRENT_DIRECTORY,
  initialValue: CURRENT_DIRECTORY,
  validate: z.string().trim().default(CURRENT_DIRECTORY),
});

if (isCancel(targetDirectory)) {
  cancel("Process canceled.");
  process.exit(1);
}

let workingDirectory: string;
if (targetDirectory === CURRENT_DIRECTORY) {
  workingDirectory = cwd();
} else {
  const resolveRealPathResult = await resolveRealPath(targetDirectory);
  if (!resolveRealPathResult.success) {
    cancel(resolveRealPathResult.error.message);
    process.exit(1);
  }
  workingDirectory = resolveRealPathResult.data;

  const getStatsResult = await getStats(workingDirectory);
  if (!getStatsResult.success) {
    cancel(getStatsResult.error.message);
    process.exit(1);
  }
  if (getStatsResult.data.isFile()) {
    cancel("The coordinate points to a single asteroid. A nebula is required.");
    process.exit(1);
  }
}

const workingDirectoryName = basename(workingDirectory);

const packageName = await text({
  message: "What is the star's name?",
  placeholder: workingDirectoryName,
  defaultValue: workingDirectoryName,
  initialValue: workingDirectoryName,
  validate: z
    .string()
    .trim()
    .min(1, "A star must have a name.")
    .default(workingDirectoryName),
});

if (isCancel(packageName)) {
  cancel("Process canceled.");
  process.exit(1);
}

outro("The void is expanding... Heat Death is near...");
