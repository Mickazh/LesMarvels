import { getData } from "./api.js";

console.log("Je suis Marvel");

getData("https://gateway.marvel.com:443/v1/public/characters").then((data) => {
  console.log(data);
});
