const button = document.querySelector('.btn');
const inputText = document.querySelector('textarea');
const output = document.getElementById('output'); // Reference for showing the result
const downloadLink = document.getElementById('download-link');

button.addEventListener('click', async () => {
    const prompt = inputText.value.trim();

    if (!prompt) {
        alert("Please enter a prompt."); // Check if prompt is not empty
        return;
    }

    console.log("Prompt:", prompt);

    try {
        // Send request to backend
        const response = await fetch('http://localhost:3000/generate-template', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt })
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        output.style.display = 'block'; // Make the output block visible

        // Call typewriter function to display the text
        typewriter(output, data.code);

    } catch (error) {
        console.error('Error fetching from server:', error);
        output.innerHTML = 'An error occurred. Please try again.';
    }
});

// Typewriter function
function typewriter(element, text, delay = 50) {
    element.innerHTML = ''; // Clear any previous text
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, delay); // Call the function recursively
        }
    }

    type();
}
