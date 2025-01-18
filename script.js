document.getElementById("qr-button").addEventListener("click", function() {
    const url = document.getElementById("url-input").value;
    if (url) {
        document.getElementById("qr-url").textContent = `${url}`;
        document.getElementById("qr-code").innerHTML = "";
        document.getElementById("url-input").value = "";
        document.getElementById("qr-code").style.display = "block";
        document.getElementsByClassName("buttons")[0].style.display = "flex";
        new QRCode(document.getElementById("qr-code"), url);
    } else {
        alert("Please enter a URL.");
    }
});

document.getElementById("qr-download").addEventListener("click", function() {
    const qrCode = document.querySelector("#qr-code canvas");

    if (qrCode) {
        const dataURL = qrCode.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "qr-code.png";
        link.click();
    } else {
        alert("Please generate a QR code first.");
    }
});

document.getElementById("qr-share").addEventListener("click", function() {
    const qrCode = document.querySelector("#qr-code canvas");
    
    if (qrCode) {
        qrCode.toBlob(function(blob) {
            const item = new ClipboardItem({"image/png": blob});
            navigator.clipboard.write([item]).then(function() {
                alert("QR code copied to clipboard.");
            }, function(error) {
                alert("Failed to copy QR code: ", error);
            });
        });
    } else {
        alert("Please generate a QR code first.");
    }
});