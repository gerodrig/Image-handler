import ImageHandler from './ImageHandler.js';

let path = './input/tucan.jpg';
let handler = new ImageHandler(path);

/**
 * Ejemplo de construccion de una imagen
 */
export const ejemplo = () => {
  let outputPath = 'output/ejemplo.jpg';
  let pixeles = [];
  let filas = 2;
  let columnas = 2;
  for (let i = 0; i < filas; i++) {
    let nuevaFila = [];
    console.log('Fila: ' + i);
    for (let j = 0; j < columnas; j++) {
      console.log('Columna:' + j);
      let pixel = [0, 0, 0]; // R G B -> Red Green Blue -> Rojo Verde Azul
      if ((i + j) % 2 === 0) {
        // Si la suma de la fila y la columna es par....
        pixel = [255, 255, 255];
      }
      console.log(
        'Vamos a añadir el pixel ' + pixel + ' a la fila ' + i + ' columna ' + j
      );
      nuevaFila.push(pixel);
    }
    console.log(nuevaFila);
    pixeles.push(nuevaFila);
  }
  console.log(pixeles);
  handler.savePixels(pixeles, outputPath, filas, columnas);
};

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */

export const redConverter = () => {
  let outputPath = 'output/tucan_red.jpg';
  let pixels = handler.getPixels();

  //? Poner los canales G y B a 0
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      pixels.set(i, j, 1, 0);
      pixels.set(i, j, 2, 0);
    }
  }

  //? Guardar los pixeles en la imagen
  handler.savePixels(pixels, outputPath);
};

/**
 * Esta función debe transformar una imagen en escala de verdes.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
export const greenConverter = () => {
  let outputPath = 'output/tucan_green.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      pixels.set(i, j, 0, 0);
      pixels.set(i, j, 2, 0);
    }
  }
  handler.savePixels(pixels, outputPath);
};

/**
 * Esta función debe transformar una imagen en escala de azules.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y G a 0 para cada pixel.
 */
export const blueConverter = () => {
  let outputPath = 'output/tucan_blue.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      pixels.set(i, j, 0, 0);
      pixels.set(i, j, 1, 0);
    }
  }

  handler.savePixels(pixels, outputPath);
};

/**
 * Esta función debe transformar una imagen a su equivalente en escala de grises.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * asignarle a cada canal de RGB esa media.
 *
 * Es decir, si un pixel tiene el valor [100, 120, 200], su media es 140 y por lo tanto
 * lo debemos transformar en el pixel [140, 140, 140].
 */
export const greyConverter = () => {
  let outputPath = 'output/tucan_grey.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      let media =
        (pixels.get(i, j, 0) + pixels.get(i, j, 1) + pixels.get(i, j, 2)) / 3;
      pixels.set(i, j, 0, media);
      pixels.set(i, j, 1, media);
      pixels.set(i, j, 2, media);
    }
  }

  handler.savePixels(
    pixels,
    outputPath,
    handler.getShape()[0],
    handler.getShape()[1]
  );
};

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transforamr el pixel en negro [0, 0, 0] o, en caso contrario,
 * transformar el pixel en blanco [255, 255, 255].
 */
export const blackAndWhiteConverter = () => {
  let outputPath = 'output/tucan_black_and_white.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo
  // Iterate over each pixel
  for (let i = 0; i < pixels.data.length; i += 4) {
    // Calculate the average of the red, green, and blue values
    let avg = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;

    // Set each color channel to the average
    pixels.data[i] = avg; // Red
    pixels.data[i + 1] = avg; // Green
    pixels.data[i + 2] = avg; // Blue
  }

  handler.savePixels(pixels, outputPath);
};

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 */
export const scaleDown = () => {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo
  //code to scale down the image

  handler.savePixels(
    nuevaImagen,
    outputPath,
    handler.getShape()[0] / 2,
    handler.getShape()[1] / 2
  );
};

/**
 * Esta función debe reducir el brillo de la imagen según el parámetro qye recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
export const dimBrightness = (dimFactor) => {
  let outputPath = 'output/tucan_dimed.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      pixels.set(i, j, 0, pixels.get(i, j, 0) / dimFactor);
      pixels.set(i, j, 1, pixels.get(i, j, 1) / dimFactor);
      pixels.set(i, j, 2, pixels.get(i, j, 2) / dimFactor);
    }
  }

  handler.savePixels(pixels, outputPath);
};

/**
 * Esta función debe invertir el color de la imagen.
 *
 * Una forma de conseguirlo es asignar a cada valor RGB de cada píxel el valor 255 - valorRGB.
 *
 * Por ejemplo, si un pixel tiene valor [10, 20, 50] su nuevo valor sera [255 - 10, 255 - 20, 255 - 50] => [245, 235, 205]
 */
export const invertColors = () => {
  let outputPath = 'output/tucan_inverse.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo

  handler.savePixels(pixels, outputPath);
};

/**
 * merge - Junta dos imagenes con cierto factor de fusion
 *
 * Una forma de conseguirlo es recorrer los pixeles de ambas imagenes y construir una nueva imagen donde
 * cada pixel sera el resultado de multiplicar los canales rgb de la primera imagen por el factor 1 y los
 * canales rgb de la segunda imagen por el factor 2.
 * @param alphaFirst Parametro a aplicar sobre la primera imagen
 * @param alphaSecond Parametro a aplicar sobre la segunda imagen
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  let pixels = [];

  //Aqui tu codigo

  dogHandler.savePixels(pixels, outputPath);
}

/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 *
 * Ejecuta el archivo actividad.js tal como se indica en el archivo Readme.md
 * En la carpeta output/ apareceran los resultados para cada uno de los casos
 *
 *     Ejecutar ejemplo: 0
 *     Conversor a rojos: 1
 *     Conversor a verdes: 2
 *     Conversor a azules: 3
 *     Conversor a grises: 4
 *     Conversor blanco y negro: 5
 *     Redimensionar: 6
 *     Reducir brillo: 7
 *     Negativo: 8
 *     Fusion de imagenes: 9
 */
// let optionN = 1;

// switch (optionN) {
//   case 1:
//     redConverter();
//     break;
//   case 2:
//     greenConverter();
//     break;
//   case 3:
//     blueConverter();
//     break;
//   case 4:
//     greyConverter();
//     break;
//   case 5:
//     blackAndWhiteConverter();
//     break;
//   case 6:
//     scaleDown();
//     break;
//   case 7:
//     dimBrightness(2);
//     break;
//   case 8:
//     invertColors();
//     break;
//   case 9:
//     merge(0.3, 0.7);
//     break;
//   default:
//     ejemplo();
// }
