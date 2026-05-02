# ⚽ 26Counter - Summer 2026 Tournament Countdown

A VS Code extension that displays a beautiful countdown timer to the major 2026 soccer tournament in your editor.

## Features

- **Status Bar Countdown**: A live countdown timer in the VS Code status bar that updates every second.
- **Beautiful Dashboard**: Click the status bar item to open an elegant webview with a detailed countdown display.
- **Real-time Updates**: Shows days, hours, minutes, and seconds until June 11, 2026.
- **Themed Colors**: Color-coded display using vibrant colors (yellow, blue, red, and green).
- **Interactive Dashboard**: Mouse-tracking glow effect on the countdown webview.
- **Always Visible**: Status bar item is prominently placed to keep the countdown always visible.

## Installation

### From Source
1. Clone this repository
2. Run `npm install` to install dependencies
3. Press `F5` to open a new VS Code window with the extension loaded in development mode

### From VS Code Marketplace
*(Once published)*
- Search for "26Counter" in the Extensions marketplace
- Click Install

## Usage

1. Once installed and activated, you'll see the countdown timer in the status bar (🏆)
2. Click the status bar item to open the full countdown dashboard
3. The timer updates automatically every second
4. Close the dashboard when you're done by closing the webview panel

## Requirements

- VS Code version 1.112.0 or higher

## Commands

- **⚽ 2026 Soccer Countdown**: Opens the countdown dashboard webview

## Configuration

The extension automatically starts counting down to **June 11, 2026 at 00:00:00** UTC.

## Development

### Scripts

- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run the test suite
- `npm run pretest` - Lint before running tests

### File Structure

- `extension.js` - Main extension file containing the countdown logic and webview
- `test/extension.test.js` - Test file
- `package.json` - Extension metadata and configuration

## License

MIT

## Author

Jhonatan Delgado (JhonatanSDelgadoL)

## Repository

https://github.com/jhonatan30/26counter