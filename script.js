// Ganti dengan API key Anda
const API_KEY = 'seceret key';

async function sendMessage() {
    const inputText = document.getElementById('inputText').value;
    const responseText = document.getElementById('responseText');
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
    const data = {
        contents: [
            {
                parts: [
                    {
                        text: inputText
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        // Log the entire result for debugging
        console.log('API Response:', result);
        
        // Check if the response structure matches the expected format and extract the text
        if (result && result.candidates && result.candidates.length > 0 
            && result.candidates[0].content && result.candidates[0].content.parts 
            && result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            responseText.innerText = text;
        } else {
            responseText.innerText = 'No valid response from API';
        }
    } catch (error) {
        responseText.innerText = 'Error: ' + error.message;
    }
}

// Tambahkan event listener ke tombol
document.getElementById('sendButton').addEventListener('click', sendMessage);
