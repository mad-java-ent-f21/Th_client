function includeHTML() {
    let z, i, element, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        element = z[i];
        /*search for elements with a certain attribute:*/
        file = element.getAttribute("include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        element.innerHTML += this.responseText;
                        if(file === "html/navbar.html") {
                            toggleMenu();
                        }
                    }
                    if (this.status == 404) {
                        element.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    element.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

function toggleMenu() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    let id = '';
    switch (page) {
        case "about.html":
            id = "about";
            break;
        case "search.html":
            id = "search";
            break;
        case "database.html":
            id = "database";
            break;
        default:
            id = "index";
            break;
    }
    let element = document.getElementById(id);
    if (element) {
        element.classList.add('active');
    }
}