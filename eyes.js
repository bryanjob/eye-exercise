const eyes = document.getElementsByClassName('eye-iris');
const pupil = document.getElementsByClassName('eye-pupil');
const tooth = document.getElementsByClassName('tooth');
const nostril = document.getElementsByClassName('nostril');
const eyelid = document.getElementsByClassName('eyelid');
const irisColorList = [
  // yellow
  ['#FFDD00', '#FFC300'], 
  // red
  ['#FF8080', '#FF0000'], 
  // purple
  ['#FF00FF', '#800080'],
  // blue
  ['#0080FF', '#004080'],
  // green
  ['#80FF80', '#008000']
];
const irisColorTransition = [
  [1, 0], 
  [1, 0],
  [0, 1]
];
const MAX_EYE_POSITION_Y = 110.0;
const MIN_EYE_POSITION_Y = 15.0;
const MAX_PUPIL_SIZE = 50;
const MIN_PUPIL_SIZE = 20;
const MAX_LID_SIZE = document.getElementsByClassName('eye-sclera')[0].clientHeight;
const MIN_LID_SIZE = 40;
const RATE = 50;
const RATE_OFFSET = 4;
let pupilSizeRate = 1;
let eyeLidRate = -10;
let irisColorSelected = 0;
const BLINK_RATE = (MAX_LID_SIZE - MIN_LID_SIZE) / Math.abs(eyeLidRate);
const BLNK_TIME = BLINK_RATE * RATE;
tooth[1].style.left = '64%';
nostril[1].style.left = '75%';
let isMoveEye = true;
const moveEye = () => isMoveEye = !isMoveEye;

// START WITH A BLINK
doBlink();

document.onmousemove = (event) => {
  var positionX = 100;
  var positionY = 180;
  var x = (event.clientX * positionX) / window.innerWidth + '%';
  var y = (event.clientY * positionY) / window.innerHeight;
  y = (y > MAX_EYE_POSITION_Y) ? MAX_EYE_POSITION_Y
  : (y < MIN_EYE_POSITION_Y) ? MIN_EYE_POSITION_Y
  : y;
  y += '%';

  if (isMoveEye) {
    for (let i = 0; i < 2; i++) {
      eyes[i].style.left = x;
      eyes[i].style.top = y;
      eyes[i].transform = 'translate(-' + x + ',-' + y + ')';
    }
  }
};

function changePupilSize() {
  console.log('++++ change pupil size ');
  pupilSizeRate *= -1;
  for (let i = 1; i <= ((MAX_PUPIL_SIZE - MIN_PUPIL_SIZE) / Math.abs(pupilSizeRate)); i++) {
    setTimeout(() => {
      for (let p = 0; p < pupil.length; p++) {
        let newPupilSize = pupil[p].clientWidth + pupilSizeRate;
        pupil[p].style.width = newPupilSize + 'px';
        pupil[p].style.height = newPupilSize + 'px';
      }
    }, (i * RATE));    
  }
}

function blink() {
  console.log('++++ blink ');
  eyeLidRate *= -1;
  for (let i = 1; i <= ((MAX_LID_SIZE - MIN_LID_SIZE) / Math.abs(eyeLidRate)); i++) {
    setTimeout(() => {
      for (let l = 0; l < eyelid.length; l++) {
        let newLidSize = eyelid[l].clientHeight + eyeLidRate;
        eyelid[l].style.height = newLidSize + 'px';
      }
    }, i * RATE);
  }
}

function doBlink() {
  blink(); setTimeout(() => { blink() }, (BLNK_TIME + RATE_OFFSET * RATE));
}

function changeIrisColor() {
  console.log('++++ change iris color ');
  const irisColorStyle = (el, color1, color2) => el.style.background = 'repeating-conic-gradient(' + color1 + ' 0 18deg, ' + color2 + ' 0 36deg)';
  const irisColorTransitionList = [];
  irisColorTransitionList.push(irisColorSelected);  
  irisColorSelected++;
  if (irisColorSelected === irisColorList.length) irisColorSelected = 0;
  irisColorTransitionList.push(irisColorSelected);
  irisColorTransitionList.push(irisColorSelected);
  for (let i = 0; i < irisColorTransitionList.length; i++) {
    for (let j = 0; j < eyes.length; j++) {
      setTimeout(() => {
        irisColorStyle(
          eyes[j], 
          irisColorList[irisColorTransitionList[i]][irisColorTransition[i][0]], 
          irisColorList[irisColorTransitionList[i]][irisColorTransition[i][1]]);
      }, i * RATE_OFFSET * RATE);      
    }    
  }
}

function resetEye() {
  console.log('++++ reset eye');
  let positionX = '50%';
  let positionY = '60%';
  for (let i = 0; i < 2; i++) {
    eyes[i].style.left = positionX;
    eyes[i].style.top = positionY;
    eyes[i].transform = "translate(-" + positionX + ",-" + positionX + ")";
  }
}