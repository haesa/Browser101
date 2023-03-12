'use strict'

const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

addEventListener('load', () => {
  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
  
    vertical.style.transform = `translateX(${x}px)`;
    horizontal.style.transform = `translateY(${y}px)`;
    target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
    tag.style.transform = `translate(${x}px, ${y}px)`;
    tag.innerHTML = `${x}px, ${y}px`;
  });
});

// let mouseX;
// let mouseY;
// const canvas = document.querySelector('#canvas');
// const span = document.querySelector('.position');
// const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// ctx.strokeStyle = 'white';
// ctx.lineWidth = 1;

// document.addEventListener('mousemove', (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
//   span.innerHTML= `${mouseX}px, ${mouseY}px`;

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.beginPath();
//   ctx.moveTo(mouseX ,0);
//   ctx.lineTo(mouseX, window.innerHeight);
//   ctx.moveTo(0, mouseY);
//   ctx.lineTo(window.innerWidth, mouseY);
//   ctx.stroke();

//   span.style.top = `${mouseY + 20}px`;
//   span.style.left = `${mouseX + 20}px`;
// });