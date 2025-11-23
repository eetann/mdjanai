# mdjanai

A CLI tool that converts Markdown to Slack-compatible rich text format.

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

### From clipboard (macOS)

Simply run the command without arguments to automatically read from your clipboard:

```bash
mdjanai
```

### From a file

```bash
mdjanai --file path/to/your/document.md
```

### From command-line arguments

```bash
mdjanai "# My Title
**Bold text** and *italic text*"
```


The tool will:
1. Convert your Markdown to Slack-compatible HTML
2. Copy the result to your clipboard (macOS only)
3. Print the converted HTML to stdout

