import { processMailmap } from '../src/modules/mailmap';
import fs from 'fs/promises';
import path from 'path';

describe('processMailmap', () => {
  it('should parse mailmap correctly', async () => {
    const mailmapPath = path.join(__dirname, 'test-mailmap.txt');
    await fs.writeFile(mailmapPath, 'newName <new@email.com> oldName <old@email.com>');

    const result = await processMailmap(mailmapPath);
    expect(result).toEqual([
      { newName: 'newName', newEmail: '<new@email.com>', oldName: 'oldName', oldEmail: '<old@email.com>' },
    ]);

    await fs.unlink(mailmapPath);
  });
});