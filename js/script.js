'use strict';

let question1 = `Итак, первый вопрос.<br> 5 в кубе = ?`;
let question2 = `Следующий вопрос: <br>Сколько ног у паука?`;
let question3 = `Желудь - плод какого дерева?`;
let question4 = `Число звезд на флаге США<br> соответствует числу штатов<br> этой страны.<br>Так сколько их?`;
let question5 = `Последний вопрос,<br> Сколько очков дает валет
<br> в карточной игре "Двадцать одно"`;
let q = [question1, question2, question3, question4, question5];

let answers = ['125', '8', 'дуба', '50', '2'];



function enteredNoName() {
    userName = prompt('Это не ответ. Как тебя называть?', '');
    if (!userName) noName();
}

let userName = prompt('Перед тем, как мы начнем, напиши свое имя', '');
// let userName = 'admin';
if (userName === null || userName.trim() === "") enteredNoName();

let difficulty = ['легко', 'нормально', 'сложно', 'невозможно'];
let difficultyTime = [120, 30, 7, 1];
let index;

let rightAnswers = 0;

let i = 1;

setDifficulty();

function result(num) {
    return num === 0 ? `на ноль вопросов из ${q.length} \u{1F630}<br><br>` :
    num === 1 ? `на один вопрос  из ${q.length} \u{1F615}<br><br>` :
    (num === 2 || num === 3) ? `на ${rightAnswers} вопроса из ${q.length} \u{1F610}<br><br>` :
    (num === 4) ? `на ${rightAnswers} вопроса из ${q.length}<br><br>Хороший результат! \u{263A}<br><br>` :
    (num === 5 && index === 3) ? `на ${rightAnswers} вопросов  из ${q.length}<br><br>
Вы получили достижение <br>"Самые быстрые руки<br> на диком западе"\u{1F60E}`:
    (num === 5) ? `на ${rightAnswers} вопросов  из ${q.length}<br><br>Отличный результат!\u{1F60A}` :
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

            img0.hidden = true;
            if (index === 0) {
                img1.hidden = false;
            } else if (index === 1) {
                img2.hidden = false;
            } else if (index === 2) {
                img3.hidden = false;
            } else if (index === 3) {
                img4.hidden = false;
            }

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
    Твой результат: ${Math.round(rightAnswers/q.length*100)}%<br>
    Отвечено верно <br>${result(rightAnswers)}`;
}
