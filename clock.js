//https://hangulclock.today/#/main

const hours = Array.from(document.querySelectorAll(".hours"));
const tens_minutes = Array.from(document.querySelectorAll(".tens_minutes"));
const unit_minutes = Array.from(document.querySelectorAll(".unit_minutes"));

const minute = document.querySelector(".minute");
const hour = document.querySelector(".hour");

const twelve = document.querySelector(".twelve");
const midnight = document.querySelector(".midnight");
const noon = document.querySelector(".noon");

const tens_length = parseInt(tens_minutes.length, 10);

const reset = time => {
  time.forEach(element => {
    element.style.color = "hsla(0,0%,100%,.3)";
  });
};

const displayHour = hours_now => {
  //1,2,3,4 (0~3) 4
  if (hours_now > 0 && hours_now < 4) {
    hours[hours_now - 1].style.color = "white";
  } else if (hours_now > 3 && hours_now < 7) {
    //5,6 (4~7) 4
    if (hours_now === 5) {
      hours[4].style.color = "white";
      hours[5].style.color = "white";
    } else {
      hours[6].style.color = "white";
      hours[7].style.color = "white";
    }
  } else if (hours_now > 6 && hours_now < 10) {
    //7,8,9 (8~13) 6
    if (hours_now === 7) {
      hours[8].style.color = "white";
      hours[9].style.color = "white";
    } else if (hours_now === 8) {
      hours[10].style.color = "white";
      hours[11].style.color = "white";
    } else {
      hours[12].style.color = "white";
      hours[13].style.color = "white";
    }
  } else if (hours_now >= 10 || hours_now === 0) {
    //10, 11, 12 (14~16) 3
    hours[14].style.color = "white";
    if (hours_now === 0) {
      hours[16].style.color = "white";
    } else {
      hours[hours_now + 4].style.color = "white";
    }
  }
};

const displayMinute = (tens, unit) => {
  if (tens !== null) {
    if (tens > 1) {
      tens_minutes[tens - 2].style.color = "white";
    }
    tens_minutes[tens_length - 1].style.color = "white";
  }
  if (unit !== 0) {
    unit_minutes[unit - 1].style.color = "white";
  }
};

const getTime = () => {
  const CURRENT_TIME = new Date();

  const CURRENT_HOUR = CURRENT_TIME.getHours();
  const CURRENT_MINUTE = CURRENT_TIME.getMinutes();
  const CURRENT_SECOND = CURRENT_TIME.getSeconds();

  const tens = CURRENT_MINUTE >= 10 ? parseInt(CURRENT_MINUTE / 10, 10) : null;
  const unit = parseInt(CURRENT_MINUTE % 10, 10);

  if (CURRENT_SECOND === 0) {
    reset(tens_minutes);
    reset(unit_minutes);
  }
  if (CURRENT_MINUTE === 0) {
    reset(hours);
    minute.style.color = "hsla(0,0%,100%,.3)";
  } else {
    minute.style.color = "white";
  }
  if (CURRENT_HOUR === 0 && CURRENT_MINUTE === 0) {
    twelve.style.color = "white";
    midnight.style.color = "white";
    hour.style.color = "hsla(0,0%,100%,.3)";
  } else if (CURRENT_HOUR === 12 && CURRENT_MINUTE === 0) {
    twelve.style.color = "white";
    noon.style.color = "white";
    hour.style.color = "hsla(0,0%,100%,.3)";
  } else {
    twelve.style.color = "hsla(0,0%,100%,.3)";
    midnight.style.color = "hsla(0,0%,100%,.3)";
    noon.style.color = "hsla(0,0%,100%,.3)";
    hour.style.color = "white";

    displayHour(CURRENT_HOUR % 12);
    displayMinute(tens, unit);
  }
};

const init = () => {
  getTime();
  setInterval(getTime, 1000);
};

init();
