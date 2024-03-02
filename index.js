// const fs = require('fs').promises;
// const path = require('path');
// const convert = require('heic-convert');

// (async () => {
//   console.time('test')
//   // Specify the folder containing HEIC files
//   const folderPath = './zdjecia/';

//   try {
//     // Read the list of files in the folder
//     const files = await fs.readdir(folderPath);

//     for (let idx in files) {
//       const fileName = files[idx];
//       if (path.extname(fileName).toLowerCase() === '.heic') {
//         // Build the full path to the HEIC file
//         const filePath = path.join(folderPath, fileName);

//         // Read the HEIC file
//         const inputBuffer = await fs.readFile(filePath);

//         // Convert the HEIC file to JPEG format
//         const images = await convert.all({
//           buffer: inputBuffer,
//           format: 'JPEG',
//         });

//         // Loop through the images (there may be multiple images in a HEIC file)
//         for (let imgIdx in images) {
//           const image = images[imgIdx];
//           const outputBuffer = await image.convert();
//           // Save the converted image with a unique name
//           await fs.writeFile(`./rest/result-${idx}-${imgIdx}.jpg`, outputBuffer);
//         }
//       }
//     }
//   console.timeEnd('test')
//   } catch (err) {
//     console.error('Error:', err);
//   }
// })();

const fs = require('fs').promises;
const path = require('path');
const convert = require('heic-convert');

(async () => {
  console.time('test');
  // Specify the folder containing HEIC files
  const folderPath = './zdjecia/';

  try {
    // Read the list of files in the folder
    const files = await fs.readdir(folderPath);

    const conversionPromises = [];

    for (let idx in files) {
      const fileName = files[idx];
      if (path.extname(fileName).toLowerCase() === '.heic') {
        // Build the full path to the HEIC file
        const filePath = path.join(folderPath, fileName);

        // Read the HEIC file
        const inputBuffer = await fs.readFile(filePath);

        // Convert the HEIC file to JPEG format
        const images = await convert.all({
          buffer: inputBuffer,
          format: 'JPEG',
        });

        // Create an array of conversion promises
        const imageConversionPromises = images.map(async (image, imgIdx) => {
          const outputBuffer = await image.convert();
          // Save the converted image with a unique name
          return fs.writeFile(`./rest/result-${idx}-${1}.jpg`, outputBuffer);
        });

        conversionPromises.push(...imageConversionPromises);
      }
    }

    // Wait for all image conversion and saving to complete
    await Promise.all(conversionPromises);

    console.timeEnd('test');
  } catch (err) {
    console.error('Error:', err);
  }
})();



