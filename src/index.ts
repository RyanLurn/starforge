#!/usr/bin/env bun

import { isCancel, cancel, intro, outro, text } from "@clack/prompts";
import { z } from "zod";

import { CURRENT_DIRECTORY } from "@/constants";

intro("Gravity is ready. Time to forge a star.");

const targetDirectory = await text({
  message: "Where will the star be born?",
  placeholder: CURRENT_DIRECTORY,
  defaultValue: CURRENT_DIRECTORY,
  initialValue: CURRENT_DIRECTORY,
  validate: z.string().default(CURRENT_DIRECTORY),
});

if (isCancel(targetDirectory)) {
  cancel("Process canceled.");
  process.exit(1);
}

outro("The void is expanding... See you again in millennia.");
