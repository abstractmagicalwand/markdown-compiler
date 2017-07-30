/* eslint
  no-magic-numbers: 0,
  comma-dangle: 0,
*/

const {tokens, nodes} = require('./constants')

module.exports = {
  lexer: {
    text: '**__*_abracadabra\n\n\n>***Akagi___ ',
    tokens: [
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 0,
        end: 2,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 2,
        value: '_',
        start: 2,
        end: 4,
      },
      {
        type: tokens.ASTERISK,
        amount: 1,
        value: '*',
        start: 4,
        end: 5,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 1,
        value: '_',
        start: 5,
        end: 6,
      },
      {
        type: tokens.CHARS,
        value: 'abracadabra',
        start: 6,
        end: 17,
      },
      {
        type: tokens.NEW_LINE,
        amount: 2,
        value: '\n',
        start: 17,
        end: 20,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 20,
        end: 21,
      },
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 21,
        end: 23,
      },
      {
        type: tokens.ASTERISK,
        amount: 1,
        value: '*',
        start: 23,
        end: 24,
      },
      {
        type: tokens.CHARS,
        value: 'Akagi',
        start: 24,
        end: 29,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 2,
        value: '_',
        start: 29,
        end: 31,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 1,
        value: '_',
        start: 31,
        end: 32,
      },
      {
        type: tokens.CHARS,
        value: ' ',
        start: 32,
        end: 33,
      },
    ],
  },
  node: {
    tokens: {
      [tokens.ASTERISK]: {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 0,
        end: 1,
      },
      [tokens.UNDERSCORE]: {
        type: tokens.UNDERSCORE,
        amount: 1,
        value: '_',
        start: 2,
        end: 3,
      },
      [tokens.CHARS]: {
        type: tokens.CHARS,
        value: 'Straw Hat',
      },
    },
    nodes: {
      [tokens.ASTERISK]: {
        type: nodes.BOLD,
        operator: '**',
        closed: false,
      },
      [tokens.UNDERSCORE]: {
        type: nodes.ITALIC,
        operator: '_',
        closed: false,
      },
      [tokens.CHARS]: {
        type: nodes.CHARS,
        value: 'Straw Hat',
      },
    },
  },
  parser: {
    text: 'Matsuura Kanan _Bokutachi_ **wa** _*Hitotsu*_ __no__ ___Hikari***',
    ast: [
      {
        type: nodes.CHARS,
        value: 'Matsuura Kanan ',
      },
      {
        type: nodes.ITALIC,
        operator: '_',
        body: [
          {
            type: nodes.CHARS,
            value: 'Bokutachi',
          },
        ],
        closed: true,
      },
      {
        type: nodes.CHARS,
        value: ' ',
      },
      {
        type: nodes.BOLD,
        operator: '**',
        body: [
          {
            type: nodes.CHARS,
            value: 'wa',
          },
        ],
        closed: true,
      },
      {
        type: nodes.CHARS,
        value: ' ',
      },
      {
        type: nodes.ITALIC,
        operator: '_',
        body: [
          {
            type: nodes.ITALIC,
            operator: '*',
            body: [
              {
                type: nodes.CHARS,
                value: 'Hitotsu',
              },
            ],
            closed: true,
          },
        ],
        closed: true,
      },
      {
        type: nodes.CHARS,
        value: ' ',
      },
      {
        type: nodes.BOLD,
        operator: '__',
        body: [
          {
            type: nodes.CHARS,
            value: 'no',
          },
        ],
        closed: true,
      },
      {
        type: nodes.CHARS,
        value: ' ',
      },
      {
        type: nodes.BOLD,
        operator: '__',
        body: [
          {
            type: nodes.ITALIC,
            operator: '_',
            body: [
              {
                type: nodes.CHARS,
                value: 'Hikari',
              },
              {
                type: nodes.BOLD,
                operator: '**',
                body: [
                  {
                    type: nodes.ITALIC,
                    operator: '*',
                    body: [],
                    closed: false,
                  },
                ],
                closed: false,
              },
            ],
            closed: false,
          },
        ],
        closed: false,
      },
    ],
  },
  compiler: {
    html: 'Matsuura Kanan <i>Bokutachi</i> <b>wa</b> <i><i>Hitotsu</i></i> <b>no</b> ___Hikari***'
  },
  launcher: {
    html: '<i>Bokutachi</i> <b>wa</b> <i><i>Hitotsu</i></i> <b>no</b> ___Hikari***',
    text: '_Bokutachi_ **wa** _*Hitotsu*_ __no__ ___Hikari***',
  },
}
