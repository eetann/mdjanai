# Development

## How It Works

mdjanai uses a custom remark plugin chain to transform Markdown:

- Headings (`# Title`) → Bold text wrapped in paragraph tags (`<p><strong># Title</strong></p>`)
- Line breaks are converted to `<br>` tags for natural formatting
- Standard Markdown elements (bold, italic, lists, code blocks) are preserved

This makes the output perfect for pasting into Slack while maintaining visual hierarchy.

## Technology Stack

- **Runtime**: Bun (Node.js compatible)
- **CLI Framework**: gunshi
- **Markdown Processing**: remark ecosystem (unified, remark-parse, remark-html, remark-breaks)
- **Build Tool**: tsdown
- **Code Quality**: Biome (linter + formatter)


## Prerequisites

This project uses [Bun](https://bun.sh/) as the runtime. Make sure you have it installed.

## Setup

```bash
# Install dependencies
bun install

# Run in development mode with watch
bun run dev

# Build the project
bun run build
```

## Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun run test:watch
```

## Code Quality

```bash
# Lint code
bun run lint

# Format code
bun run formant

# Type check
bun run typecheck
```

## Release

```bash
# Run full release pipeline (lint, typecheck, test, build, version bump)
bun run release
```

## Project Structure

```
mdjanai/
├── src/
│   ├── index.ts                    # CLI entry point
│   ├── convert.ts                  # Markdown to HTML conversion
│   ├── input.ts                    # Input handling (file, args, clipboard)
│   ├── clipboard.ts                # Clipboard operations (macOS)
│   └── remark-slack-heading.ts     # Custom remark plugin for Slack headings
├── test/                           # Test files
├── dist/                           # Built output
└── package.json
```
