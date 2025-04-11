async function login() {
    const response = await fetch(
        '/auth/login=user = ' + encodeURIComponent(document.getElementById('username').value) +
        '&password=' + encodeURIComponent(document.getElementById('password').value), 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )
    try {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText)
        }
        else if (response.status == 200) {
            const data = await response.json()
            if (data.success) {
                window.location.href = 'events.html'
            } else {
                prompt('Login failed: ' + data.message)
            }
        } else {
            prompt('Login failed: ' + response.statusText)
        }
    }catch (error) {
        prompt('Login failed: ' + error.message)
    }
    
}