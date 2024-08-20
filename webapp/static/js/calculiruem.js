async function makeRequest(url, method="GET", data=null){
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    let response = await fetch(url, options);
    if(response.ok){
        return await response.json();
    }
    else{
        let error = new Error(await response.text());
        console.log(error);
        throw error;
    }
}

async function onClick(event) {
    event.preventDefault();
    let a_input = document.getElementById('a').value;
    let b_input = document.getElementById('b').value;
    let a = event.target;
    let url = a.getAttribute('href');
    try {
        let response = await makeRequest(url, 'POST', {'A': a_input, 'B': b_input});
        let answerInt = document.getElementById('answer');
        answerInt.innerText = `Ответ: ${response.answer}`;
        answerInt.style.color = 'blue';
    } catch (err){
        console.error('Error:', err);
        let answerInt = document.getElementById('answer');
        answerInt.innerText = `Ошибка: ${err.response ? err.response.statusText: 'Произошла ошибка'}`;
        answerInt.style.color = 'red';
    }
}

function onLoad() {
    let links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', onClick)
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

window.addEventListener("load", onLoad);