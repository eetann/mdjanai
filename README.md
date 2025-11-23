<p align="center">
    <a href="https://www.npmjs.com/package/mdjanai"><img src="https://img.shields.io/npm/v/mdjanai?color=CB0200" alt="link to npm.js" /></a>
</p>

# mdjanai

A CLI tool that converts Markdown to Slack-compatible rich text format（`mrkdwn`）.

## Features

- **Slack-optimized conversion**: Converts Markdown to HTML optimized for Slack's rich text format
- **Smart heading handling**: Transforms Markdown headings (`# Title`) to bold text while preserving the `#` symbol for visual clarity
- **Natural line breaks**: Automatically handles line breaks in your text
- **Multiple input methods**: Read from files, command-line arguments, or clipboard
- **Automatic clipboard integration**: Copies converted HTML to clipboard (macOS only)

## Installation

```bash
npm install -g mdjanai
```

## Usage

### From command-line arguments

```bash
mdjanai "# My Title
**Bold text** and *italic text*"
```


### From a file

```bash
mdjanai --file path/to/your/document.md
```

### From clipboard (macOS)

Simply run the command without arguments to automatically read from your clipboard:

```bash
mdjanai
```


## Roadmap

- [x] Heading
- [x] Bulleted list
- [x] Numbered list
- [x] Checkbox
- [ ] Text formatting
    - [x] Bold
    - [x] Italic
    - [ ] Strikethrough
    - [x] Inline code
- [x] Link
- [ ] Table
- [x] Code block
- [x] Quote
- [ ] Callout
- [x] Horizontal rule
