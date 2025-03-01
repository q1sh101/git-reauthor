import { GitReauthorHistory } from './modules/filter';

(async () => {
  const rewriter = new GitReauthorHistory({
    mailmapPath: './mailmap.txt',
    repoPath: process.cwd(),
    dryRun: false,
  });

  await rewriter.reauthorHistory();
})();