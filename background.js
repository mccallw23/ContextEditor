// Create an array to store the logged events
var loggedEvents = [];

// Listen for when a Tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo && changeInfo.status == "complete"){
        loggedEvents.push({
            type: 'tab_updated',
            url: tab.url
        });
    }
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Add the message to the logged events
    loggedEvents.push(message);

    // If the message is a "read my mind" command, handle it
    if (message.type === 'read_my_mind') {
        readMind(loggedEvents);
        loggedEvents = []; // Clear the logged events
    }
});

function readMind(events) {
    // Get the API key from the config
    var apiKey = config.apiKey;

    // Convert the events to a string
    var prompt = events.map(event => {
        switch (event.type) {
            case 'key_pressed':
                return `User pressed the ${event.key} key.`;
            case 'element_mouseover':
                return `User hovered over an element with tag name ${event.tagName}.`;
            case 'window_scrolled':
                return `User scrolled the window to position (${event.scrollTop}, ${event.scrollLeft}).`;
            // Add more cases as needed...
            default:
                return '';
        }
    }).join('\n');

    // Make a POST request to the GPT-4 API
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'Given a list of user actions, your job is to read the users mind and offer insightful suggestions for how to help them.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        // Get the assistant's response
        var assistantResponse = data.choices[0].message.content.trim();
    
        // Log it to the console
        console.log('Response from GPT-4:', assistantResponse);
    
        // Send it to the content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'showAssistantResponse',
                text: assistantResponse
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    }
    );
}