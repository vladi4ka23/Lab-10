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

// Запит імені користувача
const userName = prompt("Введіть ваше ім'я:", "Anonymous");
nameSpan.textContent = userName || "Anonymous";

// Функція для обертання слотів
function spinSlots() {
  const spinDuration = 2000; // Загальний час обертання (мс)
  const spinInterval = 100; // Інтервал зміни зображення (мс)
  const endTimes = Array.from({ length: slots.length }, () =>
    Math.random() * spinDuration + spinDuration
  ); // Час зупинки для кожного слота

  slots.forEach((slot, index) => {
    let startTime = Date.now();

    function spin() {
      const elapsed = Date.now() - startTime;

      // Якщо час ще не вичерпаний, обертати
      if (elapsed < endTimes[index]) {
        const randomIndex = Math.floor(Math.random() * images.length);
        slot.src = images[randomIndex];
        setTimeout(spin, spinInterval);
      } else {
        // Встановити остаточне зображення після завершення
        const finalIndex = Math.floor(Math.random() * images.length);
        slot.src = images[finalIndex];
      }
    }

    spin();
  });
}

// Прив'язка до кнопки
document.getElementById("generate").addEventListener("click", () => {
  spinSlots();
});
