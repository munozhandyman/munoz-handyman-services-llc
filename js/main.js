/*
function copyToClipboard(button) {
    const targetId = button.getAttribute("data-target");
    const textElement = document.getElementById(targetId);
    const text = textElement.innerText;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerText;
        button.innerText = "Copied!";
        setTimeout(() => {
            button.innerText = originalText;
        }, 2000);
    });
}

document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", () => copyToClipboard(button));
});
*/
function copyToClipboard(button) {
    const targetId = button.getAttribute("data-target");
    const textElement = document.getElementById(targetId);
    if (!textElement) return; // Prevent errors if ID is wrong

    const text = textElement.innerText;

    // 1. Try the modern Clipboard API first (Requires HTTPS or localhost)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            handleSuccess(button);
        }).catch(err => console.error("Clipboard API failed: ", err));
    } else {
        // 2. Fallback for unsecure HTTP contexts (Like your custom host domain)
        const textarea = document.createElement("textarea");
        textarea.value = text;
        // Hide the element off-screen so the user doesn't see a jump
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);

        textarea.select();
        try {
            const successful = document.execCommand("copy");
            if (successful) {
                handleSuccess(button);
            } else {
                console.error("Fallback copy command was unsuccessful");
            }
        } catch (err) {
            console.error("Fallback copy execution crashed: ", err);
        }

        document.body.removeChild(textarea);
    }
}

// Separate UI update function to keep code clean
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