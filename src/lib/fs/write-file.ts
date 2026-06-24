import { join } from "node:path";

import type { DirectoryTag, ExistingTag, FileTag } from "@/lib/fs/types";
import type { Result } from "@/types/result";
import type { Tagged } from "@/types/tag";

import { UnexpectedError } from "@/utils/errors/unexpected";

export async function writeFile({
  parent,
  name,
  content,
}: {
  parent: Tagged<string, DirectoryTag | ExistingTag>;
  name: string;
  content: string;
}): Promise<Result<Tagged<string, ExistingTag | FileTag>, UnexpectedError>> {
  const path = join(parent, name);
  try {
    await Bun.write(path, content);
    return {
      success: true,
      data: path as Tagged<string, ExistingTag | FileTag>,
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        action: `write a file to ${path}`,
        cause: error,
      }),
    };
  }
}
