import fs from 'fs/promises';

export async function processMailmap(mailmapPath: string) {
  const content = await fs.readFile(mailmapPath, 'utf8');
  return content
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => {
      const [newName, newEmail, oldName, oldEmail] = line.split(/\s+/);
      return { newName, newEmail, oldName, oldEmail };
    });
}