console.clear();
import {Cookie} from"./src/script/cookie.mjs"
let timing = 16;
let cookies = [];
let number_of_cookies = 0;

document.querySelector("#cookie").addEventListener("click", clickCookie)
let cookieNbDiv = document.querySelector(".cookie_number")
let cookieSecDiv = document.querySelector(".cookie_second")
let cookie = new Cookie();
let width_ = window.innerWidth-3;
let height_ = window.innerHeight-3;
console.log(width_)
function clickCookie(){
  cookie.nb+= cookie.inc;
  updateClick();
}
/*  window.onresize = ()=>{
width_ = window.innerWidth-3;
height_ = window.innerHeight-3;
}  */

/* let autoClicker = setInterval(function(){
  cookie.nb += cookie.nbMilli;
  
  updateClick();
  verifyButton();
}, timing) */
let timeTemp = Date.now()
function autoClicker(){
  //console.log( Date.now() - timeTemp)
  cookie.nb += cookie.nbMilli*( Date.now() - timeTemp);
  //console.log(cookie.nb)
  updateClick();
let cookieTmp = cookie.nb.toFixed(0) - number_of_cookies
if(cookieTmp>0)console.log(cookieTmp)
  add_cookies(cookieTmp)
  verifyButton();
  cookie.setCookieSec();
  updateCookieSec();
  cookie.setInc();

  timeTemp = Date.now()
  requestAnimationFrame(autoClicker)
} 

function updateClick(){
cookieNbDiv.innerHTML = `${cookie.nb.toFixed(0)} cookie${cookie.nb.toFixed(0)>1?"s":""}`;
}

function updateCookieSec(){
cookieSecDiv.textContent = `${cookie.nbSec.toFixed(1)} cookie/sec`
}

function verifyButton(){
  liDiv.forEach(el => {
    if(cookie.nb >= el.dataset.price) el.style.display = "block"
    else el.style.display = "none"
  })
}

let liDiv= document.querySelectorAll("li")
liDiv.forEach(el => el.addEventListener("click", (e)=>{
  //console.log(e.target.textContent)
  
  if(isNaN(cookie[e.target.textContent])) cookie[e.target.textContent] = 0
  let val = parseInt(cookie[e.target.textContent], 10);
  cookie.nb -= e.target.dataset.price
  delete_cookie(e.target.dataset.price)
  if(e.target.textContent!=="Bonus")e.target.dataset.price *= 1.1;
  else e.target.dataset.price *= 10;
  val++;
  cookie[e.target.textContent] = +val;
/*   cookie.setCookieSec()
  updateCookieSec();
  cookie.setInc() */
  //console.log(cookie.nbMilli)
  //console.log(cookie)
}))

autoClicker()
// Start physics here /////////////////////
// module aliases

let renderDiv = document.querySelector(".reserve")

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: renderDiv,
    engine: engine,
    options: {
    width: width_,
    height: height_,
    showVelocity: false,
    wireframes: false
  }
});

// create two boxes and a ground

let ground = Bodies.rectangle(width_/2, height_, width_, 20, { isStatic: true });
let ground_left = Bodies.rectangle(0, height_/2, 20, height_, { isStatic: true });
let ground_right = Bodies.rectangle(width_, height_/2, 20, height_, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [ground_right,ground_left,ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function add_cookies(nb) {
  let x = 0;
  for(let i = 0; i<nb; i++){
    x = (Math.random()*width_) -20
    if(x<=10) x = 10
  cookies.push(
    Bodies.circle(x,-10, 10, {
      isStatic: false,
      restitution: 0.9,
      friction: 0.02,
      frictionAir: 0,
      density: 0.01,
    })
  );
  World.add(engine.world, cookies[number_of_cookies]);
  number_of_cookies=cookies.length;

  }
}

function delete_cookie(nb){

  for(let i = 0; i<nb; i++){
  World.remove(engine.world, cookies.pop())
  number_of_cookies=cookies.length;
  }

}