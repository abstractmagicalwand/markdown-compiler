import test from 'ava';

import strip from '../../helpers/strip';
import { strip as f } from './fixtures';

test('should format string', t => {
  t.is(strip(f.input), f.output);
});
