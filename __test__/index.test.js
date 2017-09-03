/* eslint comma-dangle: 0 */

import test from 'ava';

import tokenizer from '../src/tokenizer';
import parser from '../src/parser';
import traverser from '../src/traverser';
import transformer from '../src/transformer';
import codeGenerator from '../src/code-generator';
import compiler from '../src/compiler';
import module from '../src/index';

test.only(
  'should export module',
  t => t.deepEqual(
    module,
    {
      tokenizer,
      parser,
      traverser,
      transformer,
      codeGenerator,
      compiler,
    }
  )
);
