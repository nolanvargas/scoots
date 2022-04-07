const string = document.lastModified;
const year = new Date().getFullYear();

document.querySelector(".subFooter").innerHTML =
  `Last Updated: ${string}` + ` &copy; ${year} | Scoots | Nolan Thomas Vargas`;
