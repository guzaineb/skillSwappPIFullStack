const fs = require('fs');
const PDFDocument = require('pdfkit');

function generateCertificatePdf(userName, field, certificateId, outputPath, logoPath) {
  return new Promise((resolve, reject) => {
    // Création du document
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margin: 50
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // === 1. Fond coloré et bordures modernes ===
    doc.rect(0, 0, doc.page.width, doc.page.height)
       .fill('#F4F4F4'); // Fond léger gris

    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
       .lineWidth(2)
       .stroke('#AE9142'); // Bordure fine or

    // === 2. Logo (si fourni) ===
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, (doc.page.width - 120) / 2, 50, { width: 120 });
    }

    // === 3. Titre principal ===
    doc.font('Times-Bold')
       .fontSize(40)
       .fillColor('#2E2E2E') // Couleur gris foncé
       .text('Certificate of Achievement', {
         align: 'center',
         y: 160
       });

    // === 4. Nom du bénéficiaire ===
    doc.font('Times-Bold')
       .fontSize(30)
       .fillColor('#2E2E2E')
       .text(userName.toUpperCase(), {
         align: 'center',
         y: 230
       });

    // === 5. Description et domaine d'expertise ===
    doc.font('Helvetica')
       .fontSize(16)
       .fillColor('#444444')
       .text(`This certificate is awarded to`, {
         align: 'center',
         y: 290
       });

    doc.text(`${userName} for completing the course in`, {
      align: 'center',
      y: 320
    });

    doc.text(`the field of ${field}`, {
      align: 'center',
      y: 350
    });

    // === 6. Mise en forme dynamique ===
    doc.font('Helvetica-Bold')
       .fontSize(14)
       .fillColor('#AE9142')
       .text('Congratulations!', {
         align: 'center',
         y: doc.page.height - 130 // Espacement avant le certificate ID
       });

    // === 7. Certificate ID centré en bas ===
    doc.font('Helvetica')
       .fontSize(12)
       .fillColor('#888888')
       .text(`Certificate ID: ${certificateId}`, {
         align: 'center',
         y: doc.page.height - 50 // Placer le certificate ID à 50px du bas
       });

    doc.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

module.exports = generateCertificatePdf;
