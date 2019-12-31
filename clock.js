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
    element.classList.remove("on");
  });
};

const displayHour = hours_now => {
  //1,2,3,4 (0~3) 4
  if (hours_now > 0 && hours_now < 4) {
    hours[hours_now - 1].classList.add("on");
  } else if (hours_now > 3 && hours_now < 7) {
    //5,6 (4~7) 4
    if (hours_now === 5) {
      hours[4].classList.add("on");
      hours[5].classList.add("on");
    } else {
      hours[6].classList.add("on");
      hours[7].classList.add("on");
    }
  } else if (hours_now > 6 && hours_now < 10) {
    //7,8,9 (8~13) 6
    if (hours_now === 7) {
      hours[8].classList.add("on");
      hours[9].classList.add("on");
    } else if (hours_now === 8) {
      hours[10].classList.add("on");
      hours[11].classList.add("on");
    } else {
      hours[12].classList.add("on");
      hours[13].classList.add("on");
    }
  } else if (hours_now >= 10 || hours_now === 0) {
    //10, 11, 12 (14~16) 3
    hours[14].classList.add("on");
    if (hours_now === 0) {
      hours[16].classList.add("on");
    } else {
      hours[hours_now + 4].classList.add("on");
    }
  }
};

const displayMinute = (tens, unit) => {
  if (tens !== null) {
    if (tens > 1) {
      tens_minutes[tens - 2].classList.add("on");
    }
    tens_minutes[tens_length - 1].classList.add("on");
  }
  if (unit !== 0) {
    unit_minutes[unit - 1].classList.add("on");
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
    minute.classList.remove("on");
  } else {
    minute.classList.add("on");
  }
  if (CURRENT_HOUR === 0 && CURRENT_MINUTE === 0) {
    twelve.classList.add("on");
    midnight.classList.add("on");
    hour.classList.remove("on");
  } else if (CURRENT_HOUR === 12 && CURRENT_MINUTE === 0) {
    twelve.classList.add("on");
    noon.classList.add("on");
    hour.classList.remove("on");
  } else {
    twelve.classList.remove("on");
    midnight.classList.remove("on");
    noon.classList.remove("on");
    hour.classList.add("on");

    displayHour(CURRENT_HOUR % 12);
    displayMinute(tens, unit);
  }
};

const init = () => {
  getTime();
  setInterval(getTime, 1000);
};

init();
