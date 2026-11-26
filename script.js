// BUKA UNDANGAN
const openButton = document.getElementById("openButton");
const cover = document.getElementById("cover");
const content = document.getElementById("content");

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");

openButton.addEventListener("click", async () => {
    cover.classList.add("hidden");
    content.classList.remove("hidden");
    musicButton.classList.remove("hidden");

    window.scrollTo(0, 0);

    try {
        await music.play();
        musicButton.textContent = "♫ Musik Nyala";
    } catch {
        musicButton.textContent = "▶ Putar Musik";
    }
});


// MUSIK
music.volume = 0.5;

musicButton.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicButton.textContent = "♫ Musik Nyala";
            musicStatus.textContent = "Musik diputar ♡";
        } catch {
            musicStatus.textContent = "Musik tidak dapat diputar.";
        }
    } else {
        music.pause();
        musicButton.textContent = "▶ Putar Musik";
        musicStatus.textContent = "Musik dijeda.";
    }
});


// COUNTDOWN
const targetDate = new Date("2027-03-10T15:00:00").getTime();

function updateCountdown() {
    const distance = targetDate - Date.now();

    if (distance <= 0) {
        document.querySelector(".countdown").innerHTML =
            "Happy Birthday!";
        return;
    }

    document.getElementById("days").textContent =
        Math.floor(distance / 86400000);

    document.getElementById("hours").textContent =
        Math.floor(distance / 3600000 % 24);

    document.getElementById("minutes").textContent =
        Math.floor(distance / 60000 % 60);

    document.getElementById("seconds").textContent =
        Math.floor(distance / 1000 % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);


// RSVP DATABASE
const rsvpForm = document.getElementById("rsvpForm");
const responseMessage = document.getElementById("responseMessage");
const submitButton = document.getElementById("submitButton");

rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Mengirim...";
    responseMessage.textContent = "Mengirim data...";

    try {
        const response = await fetch("api_rsvp.php", {
            method: "POST",
            body: new FormData(rsvpForm)
        });

        const result = await response.json();

        responseMessage.textContent = result.message;

        if (result.success) {
            rsvpForm.reset();
        }
    } catch (error) {
        console.error(error);
        responseMessage.textContent =
            "Gagal mengirim. Periksa koneksi server.";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Kirim Konfirmasi";
    }
});


// SALIN REKENING
const copyRekening = document.getElementById("copyRekening");
const rekeningNumber = document.getElementById("rekeningNumber");
const copyMessage = document.getElementById("copyMessage");

copyRekening.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(
            rekeningNumber.textContent.trim()
        );
        copyMessage.textContent = "Nomor berhasil disalin ♡";
    } catch {
        copyMessage.textContent =
            "Salin nomor secara manual: " +
            rekeningNumber.textContent;
    }
});