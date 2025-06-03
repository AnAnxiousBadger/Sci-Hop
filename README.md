# Sci-Hop Shortcut Extension

A simple Chromium browser extension for quickly opening scholarly articles on [Sci-Hub](https://sci-hub.se) and copying their citation in Excel-friendly format.

## Supported Browsers

- Google Chrome  
- Opera  
- Opera GX  

## Features

- **Automatic Detection:** When an article is open on supported publisher websites, a small popup appears.
- **One-Click Sci-Hub Access:** Use the popup to instantly open the article on Sci-Hub.
- **Pinned Icon Access:** Use the pinned extension icon in the toolbar to trigger the same action.
- **Keyboard Shortcut:** Press `Ctrl + Shift + U` to open the article on Sci-Hub.
- **Citation Copy:** Once the Sci-Hub page is open, another popup lets you copy the article's citation to clipboard.
  - Format: **Year | Title | Author | Journal**
  - Compatible with Excel and Google Sheets (each value in its own column when pasted into a row)

### Method 1: Load Unpacked (Developer Mode)

1. Download the extension folder.
2. Open `chrome://extensions/` or `opera://extensions/`.
3. Enable **Developer mode** (top-right corner).
4. Click **Load unpacked** and select the downloaded folder.
5. Pin the extension icon for easier access (optional).

### Method 2: Pack Extension (.crx file)

1. Go to `chrome://extensions/` or `opera://extensions/` and enable **Developer mode**.
2. Click **Pack extension**.
   - For *Extension root directory*, select the downloaded folder.
   - (Optional) Leave the *Private key file* blank if generating for the first time.
3. Chrome will generate a `.crx` file and a `.pem` key.
4. To install the `.crx`, drag and drop it into the extensions page.
   - You may need to confirm installation manually.

## Privacy

This extension does **not** collect or store any personal data. All processing happens locally in your browser.

## License

MIT License
