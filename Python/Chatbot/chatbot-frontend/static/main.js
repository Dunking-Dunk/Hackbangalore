/**
 * Returns the current datetime for the message creation.
 */
function getCurrentTimestamp() {
	return new Date();
}

/**
 * Renders a message on the chat screen based on the given arguments.
 * This is called from the `showUserMessage` and `showBotMessage`.
 */
function renderMessageToScreen(args) {
	// local variables
	let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	let messagesContainer = $('.messages');

	// init element
	let message = $(`
	<li class="message ${args.message_side}">
		<div class="avatar"></div>
		<div class="text_wrapper">
			<div class="text">${args.text}</div>
			<div class="timestamp">${displayDate}</div>
		</div>
	</li>
	`);

	// add to parent
	messagesContainer.append(message);

	// animations
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}

/* Sends a message when the 'Enter' key is pressed.
 */
$(document).ready(function() {
    $('#msg_input').keydown(function(e) {
        // Check for 'Enter' key
        if (e.key === 'Enter') {
            // Prevent default behaviour of enter key
            e.preventDefault();
			// Trigger send button click event
            $('#send_button').click();
        }
    });
});

/**
 * Displays the user message on the chat screen. This is the right side message.
 */
function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}

/**
 * Displays the chatbot message on the chat screen. This is the left side message.
 */
function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}

/**
 * Get input from user and show it on screen on button click.
 */
$('#send_button').on('click', async function (e) {
    const userInput = $('#msg_input').val();
    showUserMessage(userInput);
    $('#msg_input').val('');

    try {
        // Wait for the randomstring function to resolve
        const botResponse = await randomstring(userInput);

        // Display the bot response message
        showBotMessage(botResponse);
    } catch (error) {
        console.error('Error processing bot response:', error);
    }
});

/**
 * Returns a random string. Just to specify bot message to the user.
 */
async function randomstring(query) {
    try {
        const url = `http://127.0.0.1:8000/chat?query=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch response from FastAPI endpoint');
        }
        const data = await response.json();
        return data.message; // Assuming your FastAPI endpoint returns a JSON object with a 'message' key
    } catch (error) {
        console.error('Error fetching response:', error);
        throw error; // Propagate the error instead of handling it here
    }
}

/**
 * Set initial bot message to the screen for the user.
 */
$(window).on('load', function () {
	showBotMessage('Hello there! Type in a message.');
});