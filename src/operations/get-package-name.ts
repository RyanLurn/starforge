import { isCancel, cancel, text } from "@clack/prompts";
import { basename } from "node:path";
import { z } from "zod";

import { CANCEL_MESSAGE } from "@/constants";

export async function getPackageName(workingDirectory: string) {
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
    process.exit(0);
  }

  return packageName;
}
