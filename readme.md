# Markdown compiler

## Specification
http://spec.commonmark.org/0.28

## Install
```sh
$ git clone https://github.com/abstractmagicalwand/markdown-compiler.git
$ cd markdown-compiler
$ yarn install # the start for a developer
$ yarn build # build the bundle
```

## To-Do
- [ ] Characters and lines
- [ ] Tabs
- [ ] Insecure characters
- [ ] Precedence
- [ ] Container blocks and leaf blocks
- [ ] Thematic breaks
- [ ] ATX headings
- [ ] Setext headings
- [ ] Indented code blocks
- [ ] Fenced code blocks
- [ ] HTML blocks
- [ ] Link reference definitions
- [ ] Paragraphs
- [ ] Blank lines
- [ ] Block quotes
- [ ] List items
- [ ] Lists
- [x] Backslash escapes
- [ ] Entity and numeric character references
- [ ] Code spans
- [ ] Emphasis and strong emphasis
- [ ] Links
- [ ] Images
- [x] Autolinks
- [ ] Raw HTML
- [x] Hard line breaks
- [x] Soft line breaks
- [ ] Textual content

## Backlog
- Support all list style type. https://www.w3.org/TR/html401/struct/lists.html
- `start`, `end`, `loc` add to token and node.
