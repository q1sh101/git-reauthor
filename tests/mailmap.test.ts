import { processMailmap } from '../src/modules/mailmap';
import fs from 'fs/promises';
import path from 'path';

describe('processMailmap', () => {
  const mailmapPath = path.join(__dirname, 'test-mailmap.txt');

  beforeEach(async () => {
    // Valid + Invalid + Unicode
    await fs.writeFile(mailmapPath,
      'Jane "Doe" <jane@doe.com> JANE <old@jane.com>\n' +
      'Invalid Line\n' +
      '山田 太郎 <taro@yamada.jp> <taro@old.jp>\n'
    );
  });

  afterEach(async () => {
    await fs.unlink(mailmapPath).catch(() => { });
  });

  it('parses complex names and emails', async () => {
    const result = await processMailmap(mailmapPath);
    expect(result).toEqual([
      {
        newName: 'Jane "Doe"',
        newEmail: 'jane@doe.com',
        oldName: 'JANE',
        oldEmail: 'old@jane.com'
      },
      {
        newName: '山田 太郎',
        newEmail: 'taro@yamada.jp',
        oldName: '',
        oldEmail: 'taro@old.jp'
      }
    ]);
  });
});