const fs = require('fs');
const signer = require('node-signpdf').default;
const { plainAddPlaceholder } = require('node-signpdf/dist/helpers');

/**
 * Signature numérique d'un PDF
 * @param {string} inputPath - Chemin du PDF original
 * @param {string} outputPath - Chemin du PDF signé
 * @param {string} p12Path - Chemin vers le fichier .p12 contenant le certificat
 * @param {string} passphrase - Mot de passe du fichier .p12
 */
function signPdf(inputPath, outputPath, p12Path, passphrase = '') {
  const pdfBuffer = fs.readFileSync(inputPath);
  const pdfWithPlaceholder = plainAddPlaceholder({
    pdfBuffer,
    reason: 'Certified by SkillExchange',
    name: 'SkillExchange Authority',
    location: 'Tunisie',
  });
  const p12Buffer = fs.readFileSync(p12Path);
  const signedPdf = signer.sign(pdfWithPlaceholder, p12Buffer, {
    passphrase,
  });
  fs.writeFileSync(outputPath, signedPdf);
  console.log('✅ PDF signé avec succès');
}

module.exports = signPdf;
