import { execSync } from 'child_process';
import { AuthorMapping } from '../types';
import { processMailmap } from './mailmap';

export class GitReauthorHistory {
  constructor(private config: {
    mailmapPath: string;
    repoPath: string;
    dryRun: boolean
  }) { }

  /**
   * Rewrites Git history using mailmap mappings.
   * Supports dry-run mode for testing.
   */
  async reauthorHistory() {
    const mailmap = await processMailmap(this.config.mailmapPath);
    const envFilter = this.buildEnvFilterScript(mailmap);
    const command = `git filter-branch --env-filter "${envFilter}" --tag-name-filter cat --force --all`;

    if (this.config.dryRun) {
      console.log("[Dry Run] Command:", command);
      return;
    }

    execSync(command, {
      cwd: this.config.repoPath,
      stdio: 'inherit',
      shell: '/bin/bash' // POSIX-compatible shell
    });
  }

  /**
   * Builds shell script with proper escaping.
   * Prevents injection via $GIT_AUTHOR_NAME/EMAIL.
   */
  private buildEnvFilterScript(mappings: AuthorMapping[]) {
    const escapeShell = (str: string) => str.replace(/["\\]/g, '\\$&');

    return mappings
      .map(({ oldName, oldEmail, newName, newEmail }) => {
        const eOldName = escapeShell(oldName);
        const eOldEmail = escapeShell(oldEmail);
        const eNewName = escapeShell(newName);
        const eNewEmail = escapeShell(newEmail);

        return `if [ "$GIT_AUTHOR_NAME" = "${eOldName}" ] && [ "$GIT_AUTHOR_EMAIL" = "${eOldEmail}" ]; then
  export GIT_AUTHOR_NAME="${eNewName}"
  export GIT_AUTHOR_EMAIL="${eNewEmail}"
fi
if [ "$GIT_COMMITTER_NAME" = "${eOldName}" ] && [ "$GIT_COMMITTER_EMAIL" = "${eOldEmail}" ]; then
  export GIT_COMMITTER_NAME="${eNewName}"
  export GIT_COMMITTER_EMAIL="${eNewEmail}"
fi`;
      }).join('\n');
  }
}