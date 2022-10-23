let input = document.getElementById("token-input");

getToken((token) => {
    input.value = token === undefined ? null : token;
});

document.getElementById("token-button").onclick = () => {
    let input = document.getElementById("token-input");
    setToken(input.value, () => {
        window.close();
    });
};