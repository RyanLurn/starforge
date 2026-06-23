#!/usr/bin/env bun

import { intro, outro } from "@clack/prompts";

import { getWorkingDirectory } from "@/operations/get-working-directory";
import { getPackageName } from "@/operations/get-package-name";

intro("Gravity is ready. Time to forge a star.");

const workingDirectory = await getWorkingDirectory();

const packageName = await getPackageName(workingDirectory);

outro("The void is expanding... Heat Death is near...");
