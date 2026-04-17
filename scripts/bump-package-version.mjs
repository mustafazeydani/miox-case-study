import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const packageJsonPath = path.join(repoRoot, "package.json");

const CONVENTIONAL_COMMIT_HEADER_REGEX =
  /^(?<type>[a-z]+)(?:\([^)]+\))?(?<breaking>!)?:\s.+$/;

const parsedArgs = process.argv
  .slice(2)
  .filter((argument) => argument !== "--");

const hasFlag = (flag) => parsedArgs.includes(flag);

const getCommitMessagePath = () => {
  const commitMessagePath = parsedArgs.find(
    (argument) => !argument.startsWith("--"),
  );

  if (!commitMessagePath) {
    throw new Error("Commit message file path is required.");
  }

  return path.resolve(process.cwd(), commitMessagePath);
};

const getCommitMessage = (commitMessagePath) =>
  readFileSync(commitMessagePath, "utf8")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith("#"))
    .join("\n");

const getHeadCommitMessage = () =>
  execFileSync("git", ["log", "-1", "--pretty=%B"], {
    cwd: repoRoot,
    encoding: "utf8",
  })
    .replace(/^\uFEFF/, "")
    .trim();

const getReleaseType = (commitMessage) => {
  const [header = ""] = commitMessage.split(/\r?\n/, 1);
  const match = header.match(CONVENTIONAL_COMMIT_HEADER_REGEX);

  if (!match?.groups) {
    return null;
  }

  const type = match.groups.type;
  const isBreakingChange =
    match.groups.breaking === "!" ||
    /^BREAKING CHANGE:/m.test(commitMessage) ||
    /^BREAKING-CHANGE:/m.test(commitMessage);

  if (isBreakingChange) {
    return "major";
  }

  if (type === "feat") {
    return "minor";
  }

  if (type === "fix" || type === "perf" || type === "revert") {
    return "patch";
  }

  return null;
};

const bumpVersion = (currentVersion, releaseType) => {
  const match = currentVersion.match(
    /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:[-+].*)?$/,
  );

  if (!match?.groups) {
    throw new Error(`Unsupported version format: ${currentVersion}`);
  }

  const version = {
    major: Number(match.groups.major),
    minor: Number(match.groups.minor),
    patch: Number(match.groups.patch),
  };

  if (releaseType === "major") {
    version.major += 1;
    version.minor = 0;
    version.patch = 0;
  }

  if (releaseType === "minor") {
    version.minor += 1;
    version.patch = 0;
  }

  if (releaseType === "patch") {
    version.patch += 1;
  }

  return `${version.major}.${version.minor}.${version.patch}`;
};

const stagePackageJson = () => {
  execFileSync("git", ["add", "--", packageJsonPath], {
    cwd: repoRoot,
    stdio: "ignore",
  });
};

const amendHeadCommit = () => {
  execFileSync("git", ["commit", "--amend", "--no-edit", "--no-verify"], {
    cwd: repoRoot,
    stdio: "ignore",
    env: {
      ...process.env,
      SKIP_VERSION_BUMP_AMEND: "1",
    },
  });
};

const main = () => {
  const commitMessage = hasFlag("--from-head")
    ? getHeadCommitMessage()
    : getCommitMessage(getCommitMessagePath());
  const releaseType = getReleaseType(commitMessage);

  if (!releaseType) {
    process.stdout.write("No version bump required for this commit type.\n");
    return;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  const currentVersion = packageJson.version;
  const nextVersion = bumpVersion(currentVersion, releaseType);

  if (nextVersion === currentVersion) {
    return;
  }

  packageJson.version = nextVersion;

  writeFileSync(
    packageJsonPath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    "utf8",
  );

  stagePackageJson();

  if (hasFlag("--amend-head")) {
    amendHeadCommit();
  }

  process.stdout.write(
    `Bumped package version from ${currentVersion} to ${nextVersion}.\n`,
  );
};

main();
