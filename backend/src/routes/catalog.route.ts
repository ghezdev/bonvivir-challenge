import express from "express";
import catalogController from "../controllers/catalog.controller";

export const routerCatalog = express.Router();

/**
 * @openapi
 * /api/pokemon:
 *  get:
 *      tags:
 *      - Pokemon
 *      summary: Get all pokemons. Query by name or type
 *      parameters:
 *        - name: name
 *          in: query
 *          description: Name of the pokemon
 *        - name: type
 *          in: query
 *          description: Type of the pokemon
 *      responses:
 *        200:
 *          description: List of pokemons
 *          content:
 *            application/json:
 *              example:
 *                totalPokemons: 1302
 *                maxPage: 130
 *                page: 0
 *                limit: 10
 *                pokemons:
 *                  - name: bulbasaur
 *                    image: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
 *                    types:
 *                      - grass
 *                      - poison
 *                    stats:
 *                      - effort: 0
 *                        baseStat: 45
 *                        typeStat: "hp"
 *                      - effort: 0
 *                        baseStat: 49
 *                        typeStat: attack
 *                      - effort: 0
 *                        baseStat: 49
 *                        typeStat: defense
 *                      - effort: 1
 *                        baseStat: 65
 *                        typeStat: special-attack
 *                      - effort: 0
 *                        baseStat: 65
 *                        typeStat: special-defense
 *                      - effort: 0
 *                        baseStat: 45
 *                        typeStat: speed
 *
 */
routerCatalog.get("/", catalogController.getAll);

