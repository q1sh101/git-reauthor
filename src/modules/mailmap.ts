import fs from 'fs/promises';
import { AuthorMapping } from '../types';

/**
 * Parses mailmap file with support for names containing spaces.
 * Uses regex to extract: <newName>, <newEmail>, <oldName>, <oldEmail>.
 * Ignores comments and invalid lines.
 */
export async function processMailmap(mailmapPath: string): Promise<AuthorMapping[]> {
  const content = await fs.readFile(mailmapPath, 'utf8');
  const mailmapRegex = /^\s*((?:[^<]+?)?)\s*<([^>]+)>\s+((?:[^<]+?)?)\s*<([^>]+)>\s*$/;

  return content
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .map(line => {
      const match = line.match(mailmapRegex);
      if (!match) return null;
      const [, newName, newEmail, oldName, oldEmail] = match;
      return {
        newName: newName?.trim() || '', // Handle empty names
        newEmail: newEmail.trim(),
        oldName: oldName?.trim() || '',
        oldEmail: oldEmail.trim()
      };
    })
    .filter((mapping): mapping is AuthorMapping =>
      mapping !== null &&
      !!mapping.newEmail && // Ensure required fields
      !!mapping.oldEmail
    );
}