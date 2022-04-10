const ul = document.querySelector('.list');
const btn = document.querySelector('.button')
const input = document.getElementById('task');


// enter'a basınca inputun eklemesi
input.addEventListener("keydown", function (e) {
    if (e.key == 'Enter') {
        btn.click();
    }
})


btn.addEventListener('click', function () {

    if (input.value === "") {
        const alert = document.querySelector('.mr-2');
        alert.style.display = "block";

    } else {
        newElement();
        const success = document.querySelector('.toast-body');
        success.style.display = "block";

    }
    setTimeout(() => {
        const alert = document.querySelector('.mr-2');
        alert.style.display = "none";
    }, 3000);
    setTimeout(() => {
        const input = document.getElementById('task');
        const success = document.querySelector('.toast-body');
        success.style.display = "none";

    }, 3000);

});

// 'li' Elementini oluşturmak.

function newElement(paramValue = null, paramValueId = null) { // parametreler local için
    const input = document.getElementById('task');

    let isLoadTodoList = paramValue != null ? true : false; // local için

    let currentValue = paramValue == null ? input.value : paramValue; // local için

    const liItemId = paramValueId == null ? Date.now() : paramValueId;
    const li = document.createElement("li");
    li.setAttribute("id", liItemId);
    li.innerHTML = currentValue;
    const span = document.createElement("span");
    span.setAttribute("data-close", null); // data-close, seçilen butonun daha spesifik olması için
    span.textContent = "x"
    li.appendChild(span)
    span.classList.add("float-right")
    ul.appendChild(li)

    span.addEventListener('click', function () { 
        localStorage.removeItem(li.id);     // localStorage'dan silmek için
        li.remove();
    });

    if (!isLoadTodoList) { // local için
        localStorage.setItem(liItemId, currentValue);
    }

    input.value = "";

}



function loadTodoList() { // local için
    let keys = Object.keys(localStorage); // 
    keys.forEach((key) => { // 
        const value = localStorage.getItem(key); // 
        newElement(value, key); //
    });
}

loadTodoList(); // 