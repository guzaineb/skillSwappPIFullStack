const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

async function generateCertificatePdf({
  userName = "",
  field = "",
  certificateId = generateCertificateId(), // Nouvelle fonction de génération
  outputPath = path.join(__dirname, 'certificates', 'certifcat.pdf'),
  logoPath,
  signaturePath,
  date = new Date(),


 
}) {
  // Validation des paramètres
  if (!userName || !field || !certificateId) {
    throw new Error("Paramètres requis manquants : userName, field, certificateId");
  }

  // Création du répertoire si inexistant
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margin: 40
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // === 1. ARRIÈRE-PLAN ET CADRE ===
    const grad = doc.linearGradient(0, 0, doc.page.width, doc.page.height);
    grad.stop(0, '#F8F9FA').stop(1, '#E9ECEF');
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(grad);
    
    doc.roundedRect(30, 30, doc.page.width - 60, doc.page.height - 60, 10)
       .lineWidth(2)
       .stroke('#2C3E50');

    // === 2. EN-TÊTE AVEC LOGO ===
    if (logoPath && fs.existsSync(logoPath)) {
      doc.image(logoPath, 60, 50, { width: 80 });
    }

    // === 3. TITRES ===
    doc.font('Helvetica-Bold')
       .fontSize(24)
       .fillColor('#2C3E50')
       .text('SkillSwapp', { align: 'center', y: 100 });

    doc.font('Helvetica-Bold')
       .fontSize(36)
       .fillColor('#500E63')
       .text('Certificate of Excellence', { align: 'center', y: 140 });

    // === 4. BÉNÉFICIAIRE ===
    doc.moveTo(doc.page.width/2 - 100, 200)
       .lineTo(doc.page.width/2 + 100, 200)
       .lineWidth(2)
       .stroke('#E74C3C');

    doc.font('Helvetica-Bold')
       .fontSize(28)
       .fillColor('#F23050')
       .text(userName.toUpperCase(), { align: 'center', y: 220 });

    // === 5. DESCRIPTION ===
    doc.font('Helvetica')
       .fontSize(18)
       .fillColor('#34495E')
       .text('has successfully completed the intensive training program in', {
         align: 'center',
         y: 280
       });

    doc.font('Helvetica-Bold')
       .fontSize(24)
       .fillColor('#16A085')
       .text(field, { align: 'center', y: 320 });

    // === 6. INFORMATIONS CERTIFICAT ===
    const infoY = 380;
    
    // Formatage professionnel de l'ID
    doc.font('Helvetica-Bold')
       .fontSize(14)
       .fillColor('#2C3E50')
       .text(`Certification ID: ${certificateId}`, { 
         align: 'center',
         y: infoY
       });

    doc.font('Helvetica')
       .fontSize(12)
       .fillColor('#EFC3CA')
       .text(`Awarded on: ${formatDate(date)}`, {
         align: 'center',
         y: infoY + 30
       });
    
    //doc.text(`Credit Hours: ${}`, {
      //align: 'center',
      //y: infoY + 50
    //});

    // === 7. SECTION SIGNATURE AMÉLIORÉE ===
    const sigY = doc.page.height - 150;
    
    // Ligne de signature
    doc.moveTo(doc.page.width/2 - 120, sigY + 60)
       .lineTo(doc.page.width/2 + 120, sigY + 60)
       .stroke('#34495E');

    // Signature image si disponible
    if (signaturePath && fs.existsSync(signaturePath)) {
      doc.image(signaturePath, doc.page.width/2 - 50, sigY - 30, { 
        width: 100 
      });
    } else {
      // Texte de remplacement si pas de signature
      doc.font('Helvetica-Oblique')
         .fontSize(14)
         .fillColor('#95A5A6')
         .text('Authorized Signature', {
           align: 'center',
           y: sigY - 10
         });
    }

    // Informations du signataire
  /*  doc.font('Helvetica-Bold')
       .fontSize(14)
       .fillColor('#2C3E50')
      /// .text(signatoryName, {
         align: 'center',
         y: sigY + 70
       });*/

    //*doc.font('Helvetica')
       //*.fontSize(12)
       //*.fillColor('#7F8C8D')
       //*.text(signatoryTitle, {
         //align: 'center',
         //y: sigY + 90
      // });

    // === 8. PIED DE PAGE ===
  /*  const footerY = doc.page.height - 30;
    doc.font('Helvetica-Oblique')
       .fontSize(10)
       .fillColor('#95A5A6')
       .text(`Verify this certificate at: ${accreditation.toLowerCase().replace(/\s+/g, '')}.com/verify/${certificateId}`, {
         align: 'center',
         y: footerY
       });*/ 

    doc.end();

    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
}

// Fonction pour générer un ID de certificat professionnel
function generateCertificateId() {
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `CERT-${datePart}-${randomPart}`;
}

// Fonction pour formater la date
function formatDate(date) {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

module.exports = generateCertificatePdf;