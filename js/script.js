'use strict';

function enteredNoName() {
    userName = prompt('Вы не представились. Как к вам обращаться?', '');
    if (!userName) noName();
}

let userName = prompt('Перед тем, как мы начнем, напиши свое имя', '');
if (userName === null || userName.trim() === "") enteredNoName();
// let userName = 'admin';

let difficulty = ['легко', 'нормально', 'сложно', 'невозможно'];
let difficultyTime = [120, 30, 10, 1];
let index;

let rightAnswers = 0;

let i = 1;

setDifficulty();

function result(num) {
    return num === 0 ? `..да ни на сколько<br> вопросов, на ноль из ${q.length}<br><br>` :
    num === 1 ? `всего на 1 вопрос  из ${q.length}<br><br>` :
    (num === 2 || num === 3) ? `на ${rightAnswers} вопроса из ${q.length}<br><br>` :
    (num === 4) ? `на ${rightAnswers} вопроса из ${q.length}<br><br>Хороший результат!<br><br>` :
    (num === 5 && index === 3) ? `на ${rightAnswers} вопросов  из ${q.length}<br><br>
Вы получили достижение <br>"Самые быстрые руки<br> на диком западе"\u{1F60E}`:
    (num === 5) ? `на ${rightAnswers} вопросов  из ${q.length}<br><br>Отличный результат!` :
    `на.. подожди-ка ${rightAnswers} из ${q.length}<br>Это вообще законно?<br><br>`;
}

function setDifficulty() {
    main.innerHTML= `Выбери сложность. <br>Всего 4 степени сложности:<br>
    ${difficulty[0]}, ${difficulty[1]}, ${difficulty[2]} и ${difficulty[3]}.<br>
    Чем выше сложность, <br>тем меньше дается времени.<br><br>
    Впиши желаемую сложность <br>в графу ниже:`;
    let timerId0 = setInterval(() => {
        if (difficulty.includes(input.value.toLowerCase()) ) {
            index = difficulty.indexOf(input.value.toLowerCase());
            input.value = "";
            clearInterval(timerId0);
            askQuestion(i);
        }
    }, 300);
}

function askQuestion(number) {
    let counter;
    main.innerHTML = q[number - 1];
    qNum.textContent = "Вопрос №" + i;
    hurry.hidden = false;

    let timerId = setInterval(() => {
        counter = counter ?? difficultyTime[index];
        timer.style.color = counter <= 5 ? "red" : counter <= 20 ? "orange" : "green";
        timer.textContent = counter;
        if (answers[i - 1] === input.value.toLowerCase()) {
            isTrue.textContent = 'Верно!';
            clearInterval(timerId);
            rightAnswers++;
            nextQuestion();
        } else {
            counter--;
            if (counter === -1) {
                isTrue.textContent = 'Время вышло!';
                if (index < 2) {
                    isTrue.innerHTML = `Время вышло.<br>
                    Верный ответ - ${answers[i - 1]}`;
                }
                clearInterval(timerId);
                nextQuestion();
            }
        }
    }, 1000);
}

function nextQuestion() {
    input.value = "";
    input.hidden = true;
    isTrue.hidden = false;
    hurry.hidden = true;
    i++;
    setTimeout(() => {
        isTrue.hidden = true;
        if (i <= q.length) {
            askQuestion(i);
            input.hidden = false;
        } else {
            timer.hidden = true;
            qNum.hidden = true;
            quizFinished();
        }
    }, 1000 * (4 - index));
}

function quizFinished() {
    main.innerHTML = `<i><ins>${userName}</ins></i>, викторина<br>
    на сложности "${difficulty[index]}"<br> завершена.<br><br>
    Отвечено верно <br>${result(rightAnswers)}`;
}
