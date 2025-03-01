export function validateInput(argv: string[]) {
  const mailmapPath = argv[2];
  if (!mailmapPath) {
    throw new Error('Mailmap path is required');
  }
  return { mailmapPath };
}