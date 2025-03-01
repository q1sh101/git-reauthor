import { GitReauthorHistory } from './modules/filter';
import { parseArgs } from './modules/utils';

(async () => {
  try {
    const config = parseArgs(process.argv);
    const rewriter = new GitReauthorHistory(config);
    await rewriter.reauthorHistory();
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
})();