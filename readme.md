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

## Progress
- [ ] - Automatic Escaping for Special Characters
- [x] - Paragraphs
- [ ] - Line Breaks
- [x] - Headers
- [x] - Blockquotes
- [x] - Lists
- [x] - Code Blocks
- [x] - Horizontal Rules
- [x] - Links
- [x] - Emphasis
- [x] - Code
- [x] - Images
- [ ] - Backslash Escapes
- [ ] - Automatic Links

## Backlog
- [ ] Support all list style type. https://www.w3.org/TR/html401/struct/lists.html
- [ ] Improve output error from parser's test.
- [ ] Replace `EOF` -> `EOA` and `BOF` -> `BOA`. A - article.
- [ ] Repkace `text` -> `article`

## Tips
```
& -> &#38;
< -> &lt;
> -> &gt;
```