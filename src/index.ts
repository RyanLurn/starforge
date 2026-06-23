#!/usr/bin/env bun

import { isCancel, cancel, intro, outro, text } from "@clack/prompts";
import { basename } from "node:path";
import { z } from "zod";

import { getWorkingDirectory } from "@/operations/get-working-directory";
import { CANCEL_MESSAGE } from "@/constants";

intro("Gravity is ready. Time to forge a star.");

const workingDirectory = await getWorkingDirectory();

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
  cancel(CANCEL_MESSAGE);
  process.exit(1);
}

outro("The void is expanding... Heat Death is near...");
