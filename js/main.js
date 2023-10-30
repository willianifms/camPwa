if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg;
            reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });
            console.log('Service worker registrada! ', reg);
        } catch (err) {
            console.log(" Service worker registro falhou: ", err);
        }
    });
}

var constraints = { video: { facingMode: "user" }, audio: false };

const cameraView = document.querySelector("#camera--view");
const cameraOutput = document.querySelector("#camera--output");
const cameraSensor = document.querySelector("#camera--sensor");
const cameraTrigger = document.querySelector("#camera--trigger");
const lastPhotos = document.querySelectorAll(".last-photos");

let lastThreePhotos = [];

function cameraStart() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            let track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Ocorreu um Erro.", error);
        });
}

cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    const data = cameraSensor.toDataURL("image/webp");

    if (lastThreePhotos.length === 3) {
        lastThreePhotos.shift();
    }
    lastThreePhotos.push(data);

    for (let i = 0; i < lastThreePhotos.length; i++) {
        lastPhotos[i].src = lastThreePhotos[i];
        lastPhotos[i].classList.add("taken");
    }

    cameraOutput.src = data;
    cameraOutput.classList.add("taken");
};

window.addEventListener("load", cameraStart, false);
