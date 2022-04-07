const hambutton = document.querySelector(".ham");
const mainnav = document.querySelector(".menu");
hambutton.addEventListener(
  "click",
  () => {
    mainnav.classList.toggle("responsive");
    hambutton.classList.toggle("openMenu");
  },
  false
);
window.onresize = () => {
  if (window.innerWidth > 1000) mainnav.classList.remove("responsive");
};
