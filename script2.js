document.getElementById('start-btn').addEventListener('click', () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Sorry, your browser does not support speech recognition.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.start();

    recognition.onstart = () => {
        console.log('Voice recognition started. Speak into the microphone.');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        
        // Only alert the user of the spoken command
        console.log(`You said: ${transcript}`);
        
        if (transcript.toLowerCase().startsWith("find")) {
            const searchTerm = transcript.substring(4).trim();
            const count = highlightWords(searchTerm);
            if (count > 0) {
                alert(`Found ${count} occurrence(s) of "${searchTerm}".`);
                scrollToFirstHighlight();
            } else {
                alert(`No occurrences of "${searchTerm}" found.`);
            }
        } else {
            alert("Please start with 'find'.");
        }
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = () => {
        console.log('Voice recognition ended.');
    };
});

function highlightWords(searchTerm) {
    const contentDiv = document.getElementById('content');
    const originalText = contentDiv.innerHTML;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlightedText = originalText.replace(regex, '<span class="highlight">$1</span>');

    const count = (originalText.match(regex) || []).length; // Count occurrences
    contentDiv.innerHTML = highlightedText;
    return count; // Return the count of occurrences
}

document.getElementById('unhighlight-btn').addEventListener('click', () => {
    const contentDiv = document.getElementById('content');
    const highlightedText = contentDiv.innerHTML;

    const unhighlightedText = highlightedText.replace(/<span class="highlight">(.*?)<\/span>/gi, '$1');
    
    contentDiv.innerHTML = unhighlightedText;
});

// Scroll to the first highlighted word
function scrollToFirstHighlight() {
    const firstHighlight = document.querySelector('.highlight');
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Toggle background color
document.getElementById('toggle-bg-btn').addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('white-background')) {
        body.classList.remove('white-background');
        body.classList.add('black-background');
    } else {
        body.classList.remove('black-background');
        body.classList.add('white-background');
    }
});
