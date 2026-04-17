import { spawn } from "node:child_process";

const GENERATED_PATH_PREFIX = "src/orval/generated/";
const TSC_DIAGNOSTIC_PATTERN =
  /^(?:[A-Za-z]:)?[^:\n]+?\(\d+,\d+\): error TS\d+:/;
const ROOT_TSC_DIAGNOSTIC_PATTERN = /^error TS\d+:/;

const command = "pnpm";
const args = ["exec", "tsc", "--noEmit", "--pretty", "false"];

const child = spawn(command, args, {
  cwd: process.cwd(),
  env: process.env,
  shell: process.platform === "win32",
  stdio: ["ignore", "pipe", "pipe"],
});

let stdout = "";
let stderr = "";

child.stdout.on("data", (chunk) => {
  stdout += chunk.toString();
});

child.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

const splitDiagnosticBlocks = (output) => {
  const lines = output.replaceAll("\r\n", "\n").split("\n");
  const blocks = [];
  let currentBlock = [];

  const pushCurrentBlock = () => {
    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
      currentBlock = [];
    }
  };

  for (const line of lines) {
    if (
      TSC_DIAGNOSTIC_PATTERN.test(line) ||
      ROOT_TSC_DIAGNOSTIC_PATTERN.test(line)
    ) {
      pushCurrentBlock();
      currentBlock = [line];
      continue;
    }

    if (currentBlock.length === 0) {
      if (line.trim().length > 0) {
        blocks.push([line]);
      }
      continue;
    }

    currentBlock.push(line);
  }

  pushCurrentBlock();

  return blocks;
};

const isGeneratedDiagnosticBlock = (block) => {
  const [firstLine = ""] = block;
  const normalizedLine = firstLine.replaceAll("\\", "/");

  return normalizedLine.startsWith(GENERATED_PATH_PREFIX);
};

child.on("close", (exitCode) => {
  const combinedOutput = `${stdout}${stderr}`.trim();

  if (combinedOutput.length === 0) {
    process.exit(exitCode ?? 0);
  }

  const blocks = splitDiagnosticBlocks(combinedOutput);
  const keptBlocks = [];
  let ignoredDiagnosticsCount = 0;

  for (const block of blocks) {
    if (isGeneratedDiagnosticBlock(block)) {
      ignoredDiagnosticsCount += 1;
      continue;
    }

    keptBlocks.push(block);
  }

  if (keptBlocks.length > 0) {
    process.stderr.write(
      `${keptBlocks.map((block) => block.join("\n")).join("\n")}\n`,
    );
    process.exit(1);
  }

  if (ignoredDiagnosticsCount > 0) {
    process.stdout.write(
      `Ignored ${ignoredDiagnosticsCount} TypeScript diagnostic(s) from ${GENERATED_PATH_PREFIX}\n`,
    );
  }

  process.exit(0);
});

child.on("error", (error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
