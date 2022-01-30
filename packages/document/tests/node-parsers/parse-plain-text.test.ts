import { parseNodesFromPlainText } from '../../src';

describe('Plain Text Parser', () => {
  test('returns empty array when given empty string', () => {
    const result = parseNodesFromPlainText('');
    expect(result).toHaveLength(0);
  });
});
