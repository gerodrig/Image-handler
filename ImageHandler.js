import * as fs from 'fs';
import getPixels from 'get-pixels';
import savePixels from 'save-pixels';
import ndarray from 'ndarray';
import deasync from 'deasync';

export default class ImageHandler {
  /**
   * ImageHandler tiene 3 atributos internos.
   *
   * path: Path de la imagen cuyos pixeles se quieren leer.
   * pixels: Array de arrays (Matriz) que representa cada uno de los pixeles de la imagen. Inicialmente vacío.
   * shape: Array con las dimensiones de la imagen (ancho, alto, profundidad (0)). Inicialmente [0,0,0]
   * @param {*} path Path de la imagen a leer.
   */
  constructor(path) {
    this.path = path;
    this.pixels = [];
    this.shape = [0, 0, 0];
    this._readImage();
  }

  /**
   * getPixels
   * @returns Array de pixeles de la imagen
   */
  getPixels() {
    return this.pixels;
  }

  /**
   * getShape
   * @returns Array de dimensiones de la imagen
   */
  getShape() {
    return this.shape;
  }

  /**
   * Dado un array de pixels, guarda dichos pixeles en la imagen gestionada por el handler.
   * @param {*} pixels - Array de pixeles a guardar en la imagen.
   * @param {*} path - Path de la imagen destino.
   * @param {*} width - Opcional: Ancho de la imagen. Si no se usa, se usara el ancho actual.
   * @param {*} height - Opcional: Altura de la imagen. Si no se usa, se usara la altura actual.
   *
   * Se recomienda hacer uso de las siguientes librerias:
   *  - fs
   *  - save-pixels
   *
   */
savePixels(pixels, path, width = this.shape[0], height = this.shape[1], shape = 3) {

    const newPixels = ndarray(pixels, [width, height, shape]);

    // console.log(pixels, newPixels);

    //? Guardar los pixeles en la imagen
    let finished = false;
    let hadError = false;

    const stream = savePixels(newPixels, 'jpg').pipe(
        fs.createWriteStream(path)
    );
    stream.on('finish', () => (finished = true));
    stream.on('error', () => {
        hadError = true;
        finished = true;
    });

    // Bloquea aquí hasta que se complete el stream.
    deasync.loopWhile(() => !finished);

    if (hadError) {
        throw new Error('Error al guardar la imagen.');
    }
}

  /**
   * _readImage
   * Lee la imagen gestionada por el handler.
   * Se encarga de dar valor al array de pixeles 'pixels' asociado a la imagen.
   * Se encarga de dar valor al array de dimensiones 'shape' asociado a la imagen.
   *
   * Se recomienda hacer uso de funciones auxiliares.
   * Se recomienda hacer uso de las siguientes librerias:
   *  - get-pixels
   *  - deasync
   *  - ndarray
   *
   */
  _readImage() {
    let done = false;

    //? Leer la imagen y guardar los pixeles en el atributo 'pixels'
    // console.log(this.path);
    getPixels(this.path, (err, pixels) => {
    //   console.log(pixels);

      if (err) {
        console.error('Error al leer la imagen: ', err);
        done = true;
        return;
      }

      this.pixels = pixels;
      this.shape = [pixels.shape[0], pixels.shape[1], pixels.shape[2]];
      done = true;
    });

    //? Esperar a que se termine de leer la imagen
    deasync.loopWhile(() => !done);
  }
}
