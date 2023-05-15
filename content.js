// Listen for any clicks on the document
document.addEventListener('click', function(event) {
    // Get the element that was clicked
    var element = event.target;

    // Get the element's tag name, id, and classes
    var tagName = element.tagName;
    var id = element.id;
    var classes = element.className;

    // Print out the element's details
    console.log('Clicked element details:');
    console.log('Tag name: ' + tagName);
    console.log('ID: ' + id);
    console.log('Classes: ' + classes);

    // Send the details to the background script
    chrome.runtime.sendMessage({
        type: 'element_clicked',
        tagName: tagName,
        id: id,
        classes: classes
    });
});


// Listen for any keypresses on the document
document.addEventListener('keypress', function(event) {
    // Get the key that was pressed
    var key = event.key;

    // Print out the key
    console.log('Key pressed: ' + key);

    // Send the details to the background script
    chrome.runtime.sendMessage({
        type: 'key_pressed',
        key: key
    });
});

// Listen for any mouseovers on the document
document.addEventListener('mouseover', function(event) {
    // Get the element that the mouse is over
    var element = event.target;

    // Get the element's tag name, id, and classes
    var tagName = element.tagName;
    var id = element.id;
    var classes = element.className;

    // Print out the element's details
    console.log('Mouseover element details:');
    console.log('Tag name: ' + tagName);
    console.log('ID: ' + id);
    console.log('Classes: ' + classes);

    // Send the details to the background script
    chrome.runtime.sendMessage({
        type: 'element_mouseover',
        tagName: tagName,
        id: id,
        classes: classes
    });
});


// Listen for any scroll events on the window
window.addEventListener('scroll', function(event) {
    // Get the current scroll position
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Print out the scroll position
    console.log('Scroll position: ' + scrollTop + ', ' + scrollLeft);

    // Send the details to the background script
    chrome.runtime.sendMessage({
        type: 'window_scrolled',
        scrollTop: scrollTop,
        scrollLeft: scrollLeft
    });
});


function showNotification(text) {
    // Create a new div element
    var notification = document.createElement('div');

    // Set its ID so we can style it with CSS
    notification.id = 'context-editor-notification';

    // Set its text
    notification.textContent = 'GPT-4 Assistant: ' + text;

    // Add it to the page
    document.body.appendChild(notification);

    // Remove the notification after a few seconds
    setTimeout(function() {
        notification.remove();
    }, 5000);  // Adjust this value as needed
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'showAssistantResponse') {
        showNotification(request.text);
    }
});
