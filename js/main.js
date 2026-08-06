function copyToClipboard(button) {
    const targetId = button.getAttribute("data-target");
    const textElement = document.getElementById(targetId);
    if (!textElement) return;

    const text = textElement.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            handleSuccess(button);
    });
}

function handleSuccess(button) {
    const originalText = button.innerText;
    button.innerText = "Copied!";
    setTimeout(() => {
        button.innerText = originalText;
    }, 2000);
}

document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", () => copyToClipboard(button));
});
