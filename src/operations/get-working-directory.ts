import { isCancel, confirm, cancel, text, log } from "@clack/prompts";
import { exit, cwd } from "node:process";
import { z } from "zod";

import { CURRENT_DIRECTORY, CANCEL_MESSAGE } from "@/constants";
import { makeDirectory } from "@/lib/fs/make-directory";
import { getStats } from "@/lib/fs/get-stats";

/**
 * Get the directory of the root `package.json`.
 */
export async function getWorkingDirectory() {
  let workingDirectory: undefined | string = undefined;

  while (!workingDirectory) {
    const targetDirectory = await text({
      message: "Where will the star be born?",
      placeholder: CURRENT_DIRECTORY,
      defaultValue: CURRENT_DIRECTORY,
      initialValue: CURRENT_DIRECTORY,
      validate: z.string().trim().default(CURRENT_DIRECTORY),
    });
    if (isCancel(targetDirectory)) {
      cancel(CANCEL_MESSAGE);
      exit(0);
    }
    if (targetDirectory === CURRENT_DIRECTORY) {
      workingDirectory = cwd();
      break;
    }

    const getStatsResult = await getStats(targetDirectory);

    if (getStatsResult.success) {
      if (getStatsResult.data.isFile()) {
        log.error(
          "The given coordinates point to a planet. A nebula is required."
        );
        continue;
      }
      workingDirectory = targetDirectory;
      break;
    }

    const getStatsErr = getStatsResult.error;

    if (getStatsErr.code !== "NO_ENTRY_ERROR") {
      log.error(getStatsErr.message);
      continue;
    }

    log.info("No nebula was found at given coordinates.");
    const shouldMakeDirectory = await confirm({
      message: "Shall we create one?",
    });
    if (isCancel(shouldMakeDirectory)) {
      cancel(CANCEL_MESSAGE);
      exit(0);
    }
    if (!shouldMakeDirectory) {
      continue;
    }
    const makeDirectoryResult = await makeDirectory(targetDirectory, {
      recursive: true,
    });
    if (makeDirectoryResult.success) {
      workingDirectory = targetDirectory;
      break;
    }
    log.error(makeDirectoryResult.error.message);
    continue;
  }

  return workingDirectory;
}
