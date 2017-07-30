import test from 'ava'
import launcher from './index'

test(
  'launcher',
  t => t.is(
    launcher('_Bokutachi_ *wa* _*Hitotsu*_ no _Hikari*'),
    '<i>Bokutachi</i> <i>wa</i> <i><i>Hitotsu</i></i> no _Hikari*'
  )
)
