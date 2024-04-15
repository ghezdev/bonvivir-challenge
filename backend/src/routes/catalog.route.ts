import express from "express";
import catalogController from "../controllers/catalog.controller";

export const routerCatalog = express.Router();

/**
 * @openapi
 * /api/product:
 *  get:
 *      tags:
 *      - Product
 *      summary: Get all catalog. Query by search, sort, category, priceRange and page
 *      parameters:
 *        - name: search
 *          in: query
 *          description: Search for name
 *        - name: sort
 *          in: query
 *          description: Sort by amount
 *        - name: category
 *          in: query
 *          description: Search by category
 *        - name: priceRange
 *          in: query
 *          description: Search by price range
 *        - name: page
 *          in: query
 *          description: Page of the catalog
 *      responses:
 *        200:
 *          description: Catalog
 *          content:
 *            application/json:
 *              example:
 *                totalProducts: 32
 *                maxPage: 6
 *                page: 1
 *                limit: 10
 *                catalog:
 *                - id: 4
 *                  meta_title: zuccardi-flichman-quebrada-salentein-decero-catena-zapata
 *                  meta_keyword: zuccardi-flichman-quebrada-salentein-decero-catena-zapata
 *                  meta_description:
 *                  url_key: zuccardi-flichman-quebrada-salentein-decero-catena-zapata-4
 *                  name: Zuccardi - Flichman - Quebrada - Salentein - Decero - Catena Zapata-4
 *                  categories:
 *                  - name: Vinos
 *                  - name: Tienda Sale
 *                  envio_gratis: 1
 *                  contenido: "<p>1 botella de ZUCCARDI SERIE A MALBEC . <strong> Precio de lista $10400</strong> <br><br>1 botella de Flichman Singular Petit Verdot GESTOS . <strong> Precio de lista $9200</strong> <br><br>1 botella de Quebrada de las flechas Rva Malbec 2021 . <strong> Precio de lista $14580</strong> <br><br>1 botella de Salentein Primus Malbec . <strong> Precio de lista $43700</strong> <br><br>1 botella de Decero Mini Ediciones Petit Verdot . <strong> Precio de lista $32400</strong> <br><br>1 botella de EL ENEMIGO MALBEC . <strong> Precio de lista $23700</strong> <br><br></p>\r\n<p>&nbsp;</p>"
 *                  stock: 3
 *                  thumbnail:
 *                  url: https://tienda-cdn.bonvivir.com/catalog/product/cache/3538cf6925d8e4c2f44bd5c16a20a410/x/6/x6-decero-enemigo-gestos-quebrada-salentein-zuccardi.png
 *                  description:
 *                  html: "<p><strong>El Enemigo Malbec</strong></p>\r\n<p>En vista un rojo rubí de alta intensidad y destellos violáceos.<br><br>En nariz mucha madera. Tardó en abrirse en copa y luego del agite aparece fruta roja madura.<br><br>En boca, un ataque brutal al paladar. Algo dulce y carnoso de muy buen equilibrio y acidez con taninos muy marcados.</p>\r\n<p><strong>Decero Mini Ediciones Petit Verdot</strong></p>\r\n<p>Este vino presenta una gran complejidad al combinar aromar de especias y notas florales como el jazmín.<br><br>Sus firmes taninos nos muestran el potencial que posee este varietal para la guarda y estos son un fiel reflejo de las características únicas de nuestro viñedo Remolinos.</p>\r\n<p><strong>Salentein Primus Malbec</strong></p>\r\n<div class=\"product-description\">El color en esta cosecha marca un punto de inflexión por la altísima intensidad lograda. Su matiz negro y violeta, y acompañado por el vivo brillo, entregan un vino altamente atractivo.<br><br>Con aromas intensos de frutos rojos y negros, complejos; este año con buena participación de especiados como el clavo de olor y apenas pimienta.<br><br>En la boca presenta una entrada amplia, con taninos firmes, presentes que le dan la gran estructura para una larga guarda. La acidez está equilibrada con la dulzura del alcohol; frescura con prolongado final. Vino sin ningún tipo de clarificación, estabilización; puesto en botella sin filtrar por lo que puede mostrar algún depósito prueba de su poco despojo y natural elaboración.</div>\r\n<p><strong>Quebrada de las flechas Reserva Malbec&nbsp;</strong></p>\r\n<div class=\"item-feature\">\r\n<div class=\"text-feature\">\r\n<p>Rojo violáceo brillante.</p>\r\n</div>\r\n</div>\r\n<div class=\"item-feature\">\r\n<div class=\"text-feature\">\r\n<p>Aromáticamente intenso como buen Malbec Calchaquí con buen caudal de fruta roja fresca, matices herbales y de flores con trazos de especias del roble.</p>\r\n</div>\r\n</div>\r\n<div class=\"item-feature\">\r\n<div class=\"text-feature\">\r\n<p>En boca es fluido y tenso con buen cuerpo y taninos firmes. Largo con dejo herbal y especiado.</p>\r\n</div>\r\n</div>\r\n<p><strong>Flichman Singular Petit Verdot Gestos</strong></p>\r\n<div class=\"item-feature\">\r\n<div class=\"text-feature\">\r\n<p>Rojo rubí profundo.</p>\r\n</div>\r\n</div>\r\n<div class=\"item-feature\">\r\n<div class=\"text-feature\">\r\n<p>Aromáticamente recuerda a los frutos negros confitados sobre especias con dejos fragantes y hasta perfumados por los aromas de la crianza.</p>\r\n</div>\r\n</div>\r\n<div class=\"item-feature\">\r\n<div class=\"text-feature\">\r\n<p>Al paladar es sobrio, concentrado en centro de boca, lleno de sabor frutal, taninos firmes y final largo</p>\r\n</div>\r\n</div>\r\n<p><strong>Zuccardi Serie A Malbec</strong></p>\r\n<p>Color:&nbsp;Intenso y vivo color rojo púrpura.<br><br>Aroma:&nbsp;Intensos aromas de frutos rojos maduros como ciruelas y cerezas, pimienta negra y tabaco. También se puede detectar chocolate, licor de cereza y notas especiadas.<br><br>Sabor:&nbsp;Entrada suave y aterciopelado, taninos firmes con un jugoso final.</p>"
 *                  sku: BTI000061281
 *                  media_gallery:
 *                  - label:
 *                    url: https://tienda-cdn.bonvivir.com/catalog/product/cache/3538cf6925d8e4c2f44bd5c16a20a410/x/6/x6-decero-enemigo-gestos-quebrada-salentein-zuccardi.png
 *                  price_range:
 *                    maximum_price:
 *                        final_price:
 *                            currency: ARS
 *                            value: 93786
 *                        discount:
 *                            amount_off: 40194
 *                            percent_off: 30
 *                        fixed_product_taxes: []
 *                        regular_price:
 *                            currency: ARS
 *                            value: 133980
 */
routerCatalog.get("/", catalogController.getAll);

