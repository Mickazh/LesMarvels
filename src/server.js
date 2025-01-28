import Fastify from "fastify";
import { getData } from "./api.js";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";

console.log("Je suis Marvel");

const url = "https://gateway.marvel.com:443/v1/public/characters";

const PORT = process.env.PORT

const fastify = Fastify({ logger: true });

fastify.register(fastifyView, {
  engine: {
    handlebars: handlebars,
  },
  root: "./templates",
  options: {
    partials: {
      header: "header.hbs",
      footer: "footer.hbs",
    },
  },
});

fastify.get("/", (req, res) => {
  getData(url).then((personnages) =>
    res.view("index.hbs", { personnages })
  );
});

fastify.listen({ port: PORT, host: "0.0.0.0" });
