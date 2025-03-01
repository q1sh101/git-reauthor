/**
 * Parses CLI arguments for mailmap path, repo path, and dry-run mode.
 * Defaults: ./mailmap.txt, current directory, dryRun=false.
 */
export function parseArgs(argv: string[]): {
  mailmapPath: string;
  repoPath: string;
  dryRun: boolean
} {
  const mailmapPath = argv[2] || './mailmap.txt';
  const dryRun = argv.includes('--dry-run');
  return {
    mailmapPath,
    repoPath: process.cwd(),
    dryRun
  };
}