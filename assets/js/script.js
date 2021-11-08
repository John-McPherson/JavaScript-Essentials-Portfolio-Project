let control = document.getElementsByClassName('control');
for (let x = 0; x < control.length; x++) {
    control[x].addEventListener("click", wrongAns);
}

function wrongAns(event) {
    event.preventDefault();
    event.target.classList.add("wrong");
}
