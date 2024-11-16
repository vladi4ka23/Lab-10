// Масив картинок
const images = [
    "images/apple.png", // яблуко
    "images/ax7.png", // лимон
    "images/bar.png", // груша
    "images/grape.png", // вишня
    "images/redbarry.png"  // абрикос
];

const slots = document.querySelectorAll(".slot img");
const nameSpan = document.getElementById("name");

// Аудіо елементи
const spinSound = document.getElementById("spin-sound");
const winSound = document.getElementById("win-sound");

document.getElementById("generate").addEventListener("click", () => {
    if (spinSound.paused) {
        spinSound.play();
    }
    spinSlots();
});


// Запит імені користувача
const userName = prompt("Введіть ваше ім'я:", "Anonymous");
nameSpan.textContent = userName || "Anonymous";

// Функція для обертання слотів
function spinSlots() {
    const spinDuration = 2000; // Час обертання (мс)
    const spinInterval = 100; // Інтервал зміни зображення
    const endTimes = Array.from({ length: slots.length }, () =>
        Math.random() * spinDuration + spinDuration
    );

    slots.forEach((slot, index) => {
        let startTime = Date.now();

        function spin() {
            const elapsed = Date.now() - startTime;

            if (elapsed < endTimes[index]) {
                const randomIndex = Math.floor(Math.random() * images.length);
                slot.src = images[randomIndex];
                setTimeout(spin, spinInterval);
            } else {
                // Зупинка спіна та перевірка виграшу
                const finalIndex = Math.floor(Math.random() * images.length);
                slot.src = images[finalIndex];

                if (index === slots.length - 1) {
                    checkWin();
                }
            }
        }

        spin();
    });
}


// Функція перевірки на виграш
function checkWin() {
    const columns = document.querySelectorAll(".slot-column");
    let hasWin = false;

    for (let i = 0; i < 3; i++) {
        const rowImages = [];
        columns.forEach(column => {
            const slot = column.querySelectorAll(".slot img")[i];
            rowImages.push(slot.src);
        });

        if (rowImages.every(src => src === rowImages[0])) {
            columns.forEach(column => {
                const slot = column.querySelectorAll(".slot")[i];
                slot.classList.add("win");
            });
            hasWin = true;
        }
    }

    if (hasWin) {
        spinSound.pause(); // Зупинка звуку обертання
        winSound.currentTime = 0;
        winSound.play();
        setTimeout(() => spinSound.play(), 3000); // Відновлення звуку через 3 секунди
        alert("Вітаємо, ви виграли!");
    }
}



// Прив'язка до кнопки
document.getElementById("generate").addEventListener("click", () => {
  // Очистити виграшні класи перед новим запуском
  document.querySelectorAll(".slot").forEach(slot => {
    slot.classList.remove("win");
  });
  spinSlots();
});
