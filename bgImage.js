const body = document.querySelector("body");

const getPicture = () => {
  fetch(`https://source.unsplash.com/1600x900/?space`)
    .then(response => {
      return response;
    })
    .then(response => {
      const image = new Image();
      const bg_image = document.createElement("div");
      bg_image.classList.add("bgImage");
      bg_image.style.backgroundImage = `url("${response.url}")`;
      body.prepend(bg_image);
    });
};

getPicture();
