import { execSync } from 'child_process';
import { AuthorMapping } from '../types';
import { processMailmap } from './mailmap';

export class GitReauthorHistory {
  constructor(private config: { mailmapPath: string; repoPath: string; dryRun: boolean }) { }

  async reauthorHistory() {
    const mailmap = await processMailmap(this.config.mailmapPath);
    const envFilter = this.buildEnvFilterScript(mailmap);
    const command = `git filter-branch --env-filter '${envFilter}' --tag-name-filter cat --force --all`;
    execSync(command, { cwd: this.config.repoPath, stdio: 'inherit' });
  }

  private buildEnvFilterScript(mappings: AuthorMapping[]) {
    return mappings
      .map(({ oldName, oldEmail, newName, newEmail }) => `
        if [ "$GIT_AUTHOR_NAME" = "${oldName}" ] && [ "$GIT_AUTHOR_EMAIL" = "${oldEmail}" ]; then
            export GIT_AUTHOR_NAME="${newName}"
            export GIT_AUTHOR_EMAIL="${newEmail}"
        fi
        if [ "$GIT_COMMITTER_NAME" = "${oldName}" ] && [ "$GIT_COMMITTER_EMAIL" = "${oldEmail}" ]; then
            export GIT_COMMITTER_NAME="${newName}"
            export GIT_COMMITTER_EMAIL="${newEmail}"
        fi
      `).join('\n');
  }
}