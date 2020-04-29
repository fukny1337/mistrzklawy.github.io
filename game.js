// tutaj ustawiam czas
let TIME_LIMIT = 60;

// wyrazy, zdania, które będą wykorzystywane w grze do wpisania
let quotes_array = [
"Tutaj ludzie nie patrzą w ogóle",
"Nawet nie że dziwnie, nawet nie że z dystansem",
"Tak niewidzialny się nigdy nie czułem",
"Stoję i notuję, a każdy pędzi jak Shinkansen",
"W swoje strony i w swoją jazdę",
"W swoim Sony i w swojej Mazdzie",
"Wczoraj oglądałem Między Słowami",
"Dziś sam się między tymi słowami znalazłem",
"Nic nie rozumiem, choć wszystko jest jasne",
"I szukam Cię w tłumie i czuję jak gasnę",
"Ludzie jak duchy latają nad miastem",
"Świat jest zatruty, więc chodzę w tej masce",
"Wiesz co tak lubię w Japonii?",
"To, że ludzie nie chcą żebym był jak oni",
"Dziwne oko na dłoni i znaki przy skroni",
"Ale sorry, nadal nie jestem społecznie upośledzony",
"Potrzebuję też mieć blisko kogoś",
"Bo życie to nie jest Mr. Robot",
"Wszędzie telefony, każdy sam ze sobą",
"Każdy w swojej roli, w swoim świecie, obok",
"Tutaj mnie nie widzą w tej bandzie statystów",
"Nawet bez aikido, karate, ju-jitsu",
"Każdy się broni przed wzrokiem i gestem",
"Gdzie moja jasność umysłu?",
"Nie pomógł mi las ani klasztor buddystów",
"Mnisi w Airmaxach I mcŚwiat na maksa",
"To było gdzieś na nepalskim dziedzińcu",
];

// wybiera elementy
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];

  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  // przechodzi do pierwszego wyrazu
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {

  // pobiera aktualny tekst wejściowy i dzieli go
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // przyrost całkowitej liczby wpisanych znaków
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // znaki nie wpisane
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // prawidłowe znaki
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // nieprawidłowe znaki
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // dodaje błędy
      errors++;
    }
  });

  // wyświetla ilość błędów
  error_text.textContent = total_errors + errors;

  // aktualizuje dokładność wpisywanego tekstu (wyświetla się w okienku)
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  if (curr_input.length == current_quote.length) {
    updateQuote();

    // aktualizuje błedy gracza
    total_errors += errors;

    // czyści obszar do wpisania
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // zmniejsza upływający czas
    timeLeft--;

    // zwiększa upływający czas
    timeElapsed++;

    // aktualizuje tekst stopera
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // kończy gre
    finishGame();
  }
}

function finishGame() {
  // zatrzymuje czas
  clearInterval(timer);

  // odcina od możliwości wpisania
  input_area.disabled = true;

  // tekst, który wyświetla się po zakończeniu gry.
  quote_text.textContent = "Wciśnij restart, aby zagrać ponownie.";

  // wyświetla przycisk do restartowania
  restart_btn.style.display = "block";

  // oblicza cpm (znm[znaki na minutę]) oraz wpm (wnm[wyrazy na minutę])
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // aktualizuje cpm i wpm
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // wyświetla cpm i wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}


function startGame() {

  resetValues();
  updateQuote();

  // czyści "stoper" który odmierza czas
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'kliknij niżej żeby zacząć...';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}
