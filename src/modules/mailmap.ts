import fs from 'fs/promises';
import { AuthorMapping } from '../types';
export async function processMailmap(mailmapPath: string): Promise<AuthorMapping[]> {
  const content = await fs.readFile(mailmapPath, 'utf8');
  return content
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#');
    })
    .map(line => {
      const parts = line.split(/\s+/).filter(p => p);
      if (parts.length < 4) return null;
      const [newName, newEmail, oldName, oldEmail] = parts;
      return { newName, newEmail, oldName, oldEmail };
    })
    .filter((mapping): mapping is AuthorMapping => mapping !== null);
}