'use strict'


const result = document.getElementById('resultpass');
const counts = document.getElementById('countsofsymbols');
const uppercase = document.getElementById('uppercase')
const lowercase = document.getElementById('lowercase')
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generator = document.getElementById('generator');
const copy = document.querySelector('.clipboard');

const randomFunc = {
    u: getupper,
    l: getlower,
    n: getnumber,
    s: getsymbol

}

generator.addEventListener("click", function () {
    const lenghtpass = Number(counts.value);
    // console.log(lenghtpass);

    const lowered = lowercase.checked;
    const uppered = uppercase.checked;
    const numbered = numbers.checked;
    const symboled = symbols.checked;

    // console.log(lowered, uppered, numbered, symboled);

    result.value = generatePass(
        lowered, uppered, numbered, symboled, lenghtpass
    )


})

function generatePass(l, u, n, s, c) {
    let newpassword = '';

    const typesCount = l + u + n + s;

    // console.log(typesCount);

    const typesArray = [{ l }, { u }, { n }, { s }].filter(item => Object.values(item)[0]);

    // console.log(typesArray);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < c; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];

            // console.log(funcName);

            newpassword += randomFunc[funcName]();

            // console.log(newpassword);
        });

    }

    const password = newpassword.slice(0, c)

    return password;
}

function getlower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getupper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getnumber() {
    return Number(String.fromCharCode(Math.floor(Math.random() * 10) + 48));
}

function getsymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}

copy.addEventListener('click', function () {
    const textarea = document.createElement('textarea');
    const pw = result.value;


    if (!pw) { return; }

    textarea.value = pw;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

// console.log(getlower(), getupper(), getsymbol(), getnumber());