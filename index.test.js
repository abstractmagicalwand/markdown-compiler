/* eslint comma-dangle: 0 */

import test from 'ava'
import launcher from './index'
import {launcher as mocks} from './mocks'

const {text, html} = mocks

test('launcher', t => t.is(launcher(text), html))
