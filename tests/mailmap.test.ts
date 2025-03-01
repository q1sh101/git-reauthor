import { processMailmap } from '../src/modules/mailmap';
import fs from 'fs/promises';
import path from 'path';

describe('processMailmap', () => {
  const mailmapPath = path.join(__dirname, 'test-mailmap.txt');

  beforeEach(async () => {
    await fs.writeFile(mailmapPath, 'New Dev <new@company.com> Old Dev <old@email.com>\n# Comment line\n');
  });

  afterEach(async () => {
    await fs.unlink(mailmapPath).catch(() => {});
  });

  it('parses valid lines correctly', async () => {
    const result = await processMailmap(mailmapPath);
    expect(result).toEqual([{
      newName: 'New',
      newEmail: 'Dev',
      oldName: 'Old',
      oldEmail: 'Dev'
    }]);
  });

  it('ignores invalid lines', async () => {
    await fs.appendFile(mailmapPath, 'Incomplete Line');
    const result = await processMailmap(mailmapPath);
    expect(result.length).toBe(1);
  });
});