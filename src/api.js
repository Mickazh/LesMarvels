import fetch from "node-fetch";
import { createHash } from "node:crypto";

const publicKey = process.env.PUBKEY;
const privateKey = process.env.PRIKEY;

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
  const timestamp = new Date().getTime().toString();
  const hash = await getHash(publicKey, privateKey, timestamp);

  const res = await fetch(
    `${url}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
  ).then((res) => res.json());

  const data = res.data.results;

  const personnagesAvecTN = data.filter(
    (personnage) => !personnage.thumbnail.path.endsWith("image_not_available")
  );

  const personnages = personnagesAvecTN.map((perso) => {
    return {
      imageUrl: `${perso.thumbnail.path}.${perso.thumbnail.extension}`,
      name: perso.name,
    };
  });

  return personnages;
};

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
  return createHash("md5")
    .update(`${timestamp}${privateKey}${publicKey}`)
    .digest("hex");
};
