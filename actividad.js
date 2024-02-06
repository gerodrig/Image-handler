import readline from 'readline';
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
  let nuevaImagen = [];
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      //   copiar a nuevaImagen;
      nuevaImagen.push(pixels.get(i, j, 0));
      nuevaImagen.push(0);
      nuevaImagen.push(0);
    }
  }

  //? Guardar los pixeles en la imagen asynchroneamente
  handler.savePixels(nuevaImagen, outputPath);
};

/**
 * Esta función debe transformar una imagen en escala de verdes.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
export const greenConverter = async () => {
  let outputPath = 'output/tucan_green.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo
  let nuevaImagen = [];
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      nuevaImagen.push(0);
      nuevaImagen.push(pixels.get(i, j, 1));
      nuevaImagen.push(0);
    }
  }
  await handler.savePixels(nuevaImagen, outputPath);
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
  let nuevaImagen = [];
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      nuevaImagen.push(0);
      nuevaImagen.push(0);
      nuevaImagen.push(pixels.get(i, j, 2));
    }
  }

  handler.savePixels(nuevaImagen, outputPath);
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
  let nuevaImagen = [];
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      let media =
        (pixels.get(i, j, 0) + pixels.get(i, j, 1) + pixels.get(i, j, 2)) / 3;
      nuevaImagen.push(media);
      nuevaImagen.push(media);
      nuevaImagen.push(media);
    }
  }

  handler.savePixels(nuevaImagen, outputPath);
};

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transforamr el pixel en negro [0, 0, 0] o, en caso contrario,
 * transformar el pixel en blanco [255, 255, 255].
 */
export const blackAndWhiteConverter = (threshold = 64) => {
  let outputPath = 'output/tucan_black_and_white.jpg';
  let pixels = handler.getPixels();

  // Elegir threshold para claridad de la imagen

  // Create a new array to store the modified pixels
  let nuevaImagen = new Uint8Array(pixels.shape[0] * pixels.shape[1] * 4);
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      let media =
        (pixels.get(i, j, 0) + pixels.get(i, j, 1) + pixels.get(i, j, 2)) / 3;

      let color = media > threshold ? 255 : 0; // threshold de 128 hace la imagen un poco mas oscura

      // Calculate the index in the data array
      let index = (i * pixels.shape[1] + j) * 4;
      nuevaImagen[index] = color; // Red channel
      nuevaImagen[index + 1] = color; // Green channel
      nuevaImagen[index + 2] = color; // Blue channel
    }
  }

  handler.savePixels(
    nuevaImagen,
    outputPath,
    pixels.shape[0],
    pixels.shape[1],
    4
  );
};

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 */
export const scaleDown = async () => {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();

  //Aqui tu codigo
  //code to scale down the image to  half by removing the even rows and columns
  let nuevaImagen = [];
  for (let i = 0; i < pixels.shape[0]; i += 2) {
    for (let j = 0; j < pixels.shape[1]; j += 2) {
      for (let k = 0; k < 3; k++) {
        // Asumiendo que trabajamos con imágenes RGB
        nuevaImagen.push(pixels.get(i, j, k));
      }
    }
  }

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
  let newImage = [];
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      newImage.push(pixels.get(i, j, 0) / dimFactor);
      newImage.push(pixels.get(i, j, 1) / dimFactor);
      newImage.push(pixels.get(i, j, 2) / dimFactor);
    }
  }

  handler.savePixels(newImage, outputPath);
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
  let nuevaImagen = [];
  for (let i = 0; i < pixels.shape[0]; i++) {
    for (let j = 0; j < pixels.shape[1]; j++) {
      nuevaImagen.push(255 - pixels.get(i, j, 0));
      nuevaImagen.push(255 - pixels.get(i, j, 1));
      nuevaImagen.push(255 - pixels.get(i, j, 2));
    }
  }

  handler.savePixels(nuevaImagen, outputPath);
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
export const merge = (alphaFirst = 0.3, alphaSecond = 0.7) => {
  if (alphaFirst + alphaSecond !== 1) {
    throw new Error('Los factores de fusion deben sumar 1');
  }

  let catHandler = new ImageHandler('./input/cat.jpg');
  let dogHandler = new ImageHandler('./input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  if (
    catPixels.shape[0] !== dogPixels.shape[0] ||
    catPixels.shape[1] !== dogPixels.shape[1]
  ) {
    throw new Error(
      'Las imágenes deben tener las mismas dimensiones para fusionarse'
    );
  }

  let pixels = new Uint8ClampedArray(
    catPixels.shape[0] * catPixels.shape[1] * 4
  );
  //Aqui tu codigo
  for (let i = 0; i < catPixels.shape[0]; i++) {
    for (let j = 0; j < catPixels.shape[1]; j++) {
      let index = (i * catPixels.shape[1] + j) * 4;
      for (let k = 0; k < 3; k++) {
        // Iterate over RGB channels
        let mergedValue =
          catPixels.get(i, j, k) * alphaSecond +
          dogPixels.get(i, j, k) * alphaFirst;
        pixels[index + k] = Math.round(mergedValue);
      }
      pixels[index + 3] = 255; // Set alpha channel to fully opaque
    }
  }

  dogHandler.savePixels(
    pixels,
    outputPath,
    catPixels.shape[0],
    catPixels.shape[1],
    4
  );
};

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
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const runCase = (option) => {
  switch (option) {
    case '1':
      redConverter();
      console.log(
        'La imagen se ha convertido a tonalidad verde y fue grabada en folder output'
      );
      break;
    case '2':
      greenConverter();
      break;
    case '3':
      blueConverter();
      break;
    case '4':
      greyConverter();
      break;
    case '5':
      blackAndWhiteConverter();
      break;
    case '6':
      scaleDown();
      break;
    case '7':
      dimBrightness(2);
      break;
    case '8':
      invertColors();
      break;
    case '9':
      merge(0.3, 0.7);
      break;
    case 'all':
      runAllCases();
      break;
    default:
      console.log('Opción no válida.');
  }
};

const runAllCases = () => {
  for (let i = 1; i <= 9; i++) {
    runCase(i.toString());
  }
};

rl.question('Elije una opcion de (1-9) o "all" para correr todos los casos: ', (answer) => {
  runCase(answer);
  rl.close();
});
