
# Context Editor - Chrome Extension
Context Editor is a Chrome extension that logs user actions on a webpage and uses the GPT-4 API to infer their intentions.

## Description
This Chrome extension logs various user actions such as clicks, keypresses, and mouseovers, then sends these logs to the OpenAI GPT-4 API to infer what the user might be thinking and provide useful suggestions. It provides in-page notifications showing insights from the GPT-4 assistant.

## Installation
Follow these steps to install the extension in your local Chrome browser:

## Clone this repository:
```bash
git clone https://github.com/username/context-editor
```
Open Chrome, and navigate to chrome://extensions.
Enable Developer Mode by clicking the toggle switch at the top right.
Click the "Load unpacked" button and select the context-editor directory.
Usage
Navigate to a webpage.
Interact with the page (click on elements, press keys, etc.).
Click on the extension icon and click "Read My Mind".
The extension will infer your intentions based on your interactions and show notifications in the page with suggestions.
Configuration
For the extension to work properly, you need to provide your OpenAI API key. This can be done by editing the config.js file and replacing 'your-api-key' with your actual API key:

```javascript
var config = {
    apiKey: 'your-api-key'
};
```
## Contributing
Pull requests are welcome. For all changes, please open an issue first to discuss what you would like to change.