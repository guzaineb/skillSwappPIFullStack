const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const { createCanvas } = require('canvas');

/**
 * Génère un certificat PDF professionnel et élégant
 * @param {Object} options - Options de configuration du certificat
 * @returns {Promise<string>} - Chemin du fichier PDF généré
 */
async function generateCertificatePdf({
  // Informations du bénéficiaire
  userName = "",
  field = "",
  completionDate = new Date(),
  creditHours = 40,
  grade = "A",

  // Informations du certificat
  certificateId = generateCertificateId(),
  issueDate = new Date(),
  expiryDate = null, // Optionnel

  // Informations du signataire (non utilisées)
  // Ces paramètres sont conservés pour compatibilité mais ne sont plus affichés

  // Informations de l'organisation
  organizationName = "SkillSwapp Academy",
  organizationTagline = "Empowering Skills, Transforming Lives",
  accreditation = "International Skills Council",

  // Ressources
  logoPath,
  signaturePath,
  badgePath,
  watermarkPath,

  // Options de vérification
  verificationUrl = "skillswapp.com/verify",

  // Options de sortie
  outputPath = path.join(__dirname, 'certificates', `certificate_${Date.now()}.pdf`),

  // Options de style
  primaryColor = '#500E63',
  secondaryColor = '#16A085',
  accentColor = '#F23050',
  backgroundColor = '#F8F9FA',

  // Options avancées
  includeQRCode = true,
  includeWatermark = true,
  includeBadge = true,

}) {
  // Validation des paramètres essentiels
  if (!userName || !field) {
    throw new Error("Paramètres requis manquants : userName, field");
  }

  // Création du répertoire de sortie si inexistant
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Génération du QR code si demandé
  let qrCodeDataURL = null;
  if (includeQRCode) {
    try {
      // Créer l'URL de vérification qui sera encodée dans le QR code
      const verificationString = `${verificationUrl}/${certificateId}`;

      // Créer un canvas pour générer le QR code
      const canvas = createCanvas(200, 200);

      // Générer le QR code sur le canvas
      await QRCode.toCanvas(canvas, verificationString, {
        errorCorrectionLevel: 'H',
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      // Convertir le canvas en URL de données pour l'utiliser dans le PDF
      qrCodeDataURL = canvas.toDataURL();
    } catch (error) {
      console.warn("Impossible de générer le QR code:", error);
    }
  }

  return new Promise((resolve, reject) => {
    // Création du document PDF au format A4 portrait avec dimensions exactes
    const doc = new PDFDocument({
      size: [595.28, 841.89], // Dimensions exactes d'une page A4 en points (72 points par pouce)
      layout: 'portrait',
      margin: 30,
      info: {
        Title: `${organizationName} - Certificate of Excellence`,
        Author: organizationName,
        Subject: `Certificate for ${userName} in ${field}`,
        Keywords: 'certificate, education, training, skills',
        CreationDate: new Date(),
      }
    });

    // Vérification des dimensions pour le débogage
    console.log(`Dimensions du document: ${doc.page.width} x ${doc.page.height} points (A4 standard: 595.28 x 841.89 points)`);

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Dimensions du document pour référence
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // === 1. ARRIÈRE-PLAN ET ÉLÉMENTS DÉCORATIFS SOPHISTIQUÉS ===

    // Fond dégradé élégant avec plusieurs points d'arrêt pour un effet plus doux
    const grad = doc.linearGradient(0, 0, pageWidth, pageHeight);
    grad.stop(0, backgroundColor)
      .stop(0.4, lightenColor(backgroundColor, 10))
      .stop(0.6, lightenColor(backgroundColor, 20))
      .stop(1, '#E9ECEF');
    doc.rect(0, 0, pageWidth, pageHeight).fill(grad);

    // Motif géométrique subtil en arrière-plan
    drawBackgroundPattern(doc, pageWidth, pageHeight, primaryColor, 0.03);

    // Watermark (filigrane) si disponible
    if (includeWatermark && watermarkPath && fs.existsSync(watermarkPath)) {
      doc.image(watermarkPath, pageWidth / 2 - 200, pageHeight / 2 - 200, {
        width: 400,
        opacity: 0.06
      });
    }

    // Double bordure décorative avec coins arrondis
    // Bordure extérieure
    doc.roundedRect(20, 20, pageWidth - 40, pageHeight - 40, 15)
      .lineWidth(2)
      .stroke(lightenColor(primaryColor, 30));

    // Bordure intérieure
    doc.roundedRect(30, 30, pageWidth - 60, pageHeight - 60, 12)
      .lineWidth(3)
      .stroke(primaryColor);

    // Effet de ruban dans les coins
    drawRibbonCorner(doc, 15, 15, 60, primaryColor, secondaryColor);
    drawRibbonCorner(doc, pageWidth - 15, 15, 60, primaryColor, secondaryColor, 90);
    drawRibbonCorner(doc, 15, pageHeight - 15, 60, primaryColor, secondaryColor, 270);
    drawRibbonCorner(doc, pageWidth - 15, pageHeight - 15, 60, primaryColor, secondaryColor, 180);

    // Motifs décoratifs élégants dans les coins
    drawCornerDecoration(doc, 50, 50, primaryColor, secondaryColor);
    drawCornerDecoration(doc, pageWidth - 50, 50, primaryColor, secondaryColor, 90);
    drawCornerDecoration(doc, 50, pageHeight - 50, primaryColor, secondaryColor, 270);
    drawCornerDecoration(doc, pageWidth - 50, pageHeight - 50, primaryColor, secondaryColor, 180);

    // === 2. EN-TÊTE AVEC LOGO ET TITRE (CENTRÉ PLUS BAS SUR LA PAGE) ===

    // Positionnement plus bas sur la page
    const headerStartY = 100; // Position de départ plus basse

    // Logo de l'organisation (centré)
    if (logoPath && fs.existsSync(logoPath)) {
      doc.image(logoPath, pageWidth / 2 - 40, headerStartY, { width: 80, align: 'center' });
    }

    // Titre de l'organisation
    doc.font('Helvetica-Bold')
      .fontSize(26) // Taille légèrement augmentée
      .fillColor(primaryColor)
      .text(organizationName, { align: 'center', y: headerStartY + 90 });

    // Slogan/Tagline
    doc.font('Helvetica')
      .fontSize(13) // Taille légèrement augmentée
      .fillColor('#555555')
      .text(organizationTagline, { align: 'center', y: headerStartY + 125 });

    // Titre du certificat avec effet décoratif
    doc.font('Helvetica-Bold')
      .fontSize(34) // Taille légèrement augmentée
      .fillColor(primaryColor);

    // Dessiner une ligne décorative au-dessus du titre
    const titleY = headerStartY + 160; // Position ajustée
    const titleLineWidth = Math.min(350, pageWidth - 80); // Largeur adaptative

    doc.moveTo(pageWidth / 2 - titleLineWidth / 2, titleY - 10)
      .lineTo(pageWidth / 2 + titleLineWidth / 2, titleY - 10)
      .lineWidth(2)
      .stroke(accentColor);

    doc.text('Certificate of Excellence', { align: 'center', y: titleY });

    // Dessiner une ligne décorative en-dessous du titre
    doc.moveTo(pageWidth / 2 - titleLineWidth / 2, titleY + 45) // Hauteur ajustée
      .lineTo(pageWidth / 2 + titleLineWidth / 2, titleY + 45)
      .lineWidth(2)
      .stroke(accentColor);

    // === 3. TEXTE DE CERTIFICATION (AJUSTÉ POUR SUIVRE LE NOUVEL EN-TÊTE) ===
    doc.font('Helvetica')
      .fontSize(14)
      .fillColor('#333333')
      .text('This is to certify that', { align: 'center', y: titleY + 70 });

    // === 4. NOM DU BÉNÉFICIAIRE (MISE EN ÉVIDENCE ÉLÉGANTE ADAPTÉE AU FORMAT A4) ===
    const nameY = titleY + 95; // Position relative au titre
    const nameWidth = Math.min(400, pageWidth - 60); // Largeur adaptative
    const nameHeight = 60; // Hauteur réduite
    const nameX = pageWidth / 2 - nameWidth / 2;

    // Effet d'ombre portée pour le cadre du nom
    doc.rect(nameX + 5, nameY + 5, nameWidth, nameHeight)
      .fillOpacity(0.05)
      .fill('#000000')
      .fillOpacity(1);

    // Fond dégradé élégant pour le nom
    const nameGrad = doc.linearGradient(nameX, nameY, nameX + nameWidth, nameY + nameHeight);
    nameGrad.stop(0, lightenColor(primaryColor, 90))
      .stop(0.5, lightenColor(primaryColor, 95))
      .stop(1, lightenColor(primaryColor, 90));

    doc.roundedRect(nameX, nameY, nameWidth, nameHeight, 8)
      .fill(nameGrad);

    // Double bordure décorative pour le nom
    // Bordure extérieure
    doc.roundedRect(nameX, nameY, nameWidth, nameHeight, 8)
      .lineWidth(2) // Épaisseur réduite
      .stroke(lightenColor(accentColor, 20));

    // Bordure intérieure avec effet pointillé élégant
    doc.roundedRect(nameX + 3, nameY + 3, nameWidth - 6, nameHeight - 6, 6)
      .lineWidth(1)
      .dash(3, { space: 2 })
      .stroke(accentColor)
      .undash();

    // Éléments décoratifs aux coins du cadre du nom (plus petits)
    const cornerSize = 12; // Taille réduite

    // Coin supérieur gauche
    doc.moveTo(nameX, nameY + cornerSize)
      .lineTo(nameX, nameY)
      .lineTo(nameX + cornerSize, nameY)
      .lineWidth(1.5) // Épaisseur réduite
      .stroke(accentColor);

    // Coin supérieur droit
    doc.moveTo(nameX + nameWidth - cornerSize, nameY)
      .lineTo(nameX + nameWidth, nameY)
      .lineTo(nameX + nameWidth, nameY + cornerSize)
      .lineWidth(1.5)
      .stroke(accentColor);

    // Coin inférieur gauche
    doc.moveTo(nameX, nameY + nameHeight - cornerSize)
      .lineTo(nameX, nameY + nameHeight)
      .lineTo(nameX + cornerSize, nameY + nameHeight)
      .lineWidth(1.5)
      .stroke(accentColor);

    // Coin inférieur droit
    doc.moveTo(nameX + nameWidth - cornerSize, nameY + nameHeight)
      .lineTo(nameX + nameWidth, nameY + nameHeight)
      .lineTo(nameX + nameWidth, nameY + nameHeight - cornerSize)
      .lineWidth(1.5)
      .stroke(accentColor);

    // Nom du bénéficiaire avec effet d'ombre
    // Ombre du texte (très subtile)
    doc.font('Helvetica-Bold')
      .fontSize(28) // Taille réduite
      .fillColor(lightenColor(accentColor, 20))
      .text(userName.toUpperCase(), { align: 'center', y: nameY + 18 });

    // Texte principal
    doc.font('Helvetica-Bold')
      .fontSize(28) // Taille réduite
      .fillColor(accentColor)
      .text(userName.toUpperCase(), { align: 'center', y: nameY + 16 });

    // === 5. DESCRIPTION DE LA CERTIFICATION (ADAPTÉE AU FORMAT A4) ===
    const descY = nameY + nameHeight + 15; // Position relative au nom du bénéficiaire
    doc.font('Helvetica')
      .fontSize(14)
      .fillColor('#333333')
      .text('has successfully completed the intensive training program in', {
        align: 'center',
        y: descY
      });

    // Domaine/Sujet de la certification
    doc.font('Helvetica-Bold')
      .fontSize(20)
      .fillColor(secondaryColor)
      .text(field, {
        align: 'center',
        y: descY + 25,
        width: pageWidth - 60,
        lineGap: 2
      });

    // Informations supplémentaires
    doc.font('Helvetica')
      .fontSize(12)
      .fillColor('#333333')
      .text(`with ${creditHours} credit hours and achieved a grade of ${grade}`, {
        align: 'center',
        y: descY + 60
      });

    // === 6. BADGE DE RÉUSSITE (SI DISPONIBLE) ===
    if (includeBadge && badgePath && fs.existsSync(badgePath)) {
      // Badge plus petit et repositionné
      doc.image(badgePath, pageWidth - 120, descY - 10, {
        width: 70, // Taille réduite
        align: 'right'
      });
    }

    // === 7. INFORMATIONS DU CERTIFICAT (DESIGN MODERNE ADAPTÉ AU FORMAT A4) ===
    const infoY = descY + 100; // Position relative à la description
    const infoX = 50; // Marges réduites
    const infoWidth = pageWidth - (infoX * 2);
    const infoHeight = 120; // Hauteur augmentée pour compenser la largeur réduite

    // Fond avec dégradé subtil pour la section d'informations
    const infoGrad = doc.linearGradient(infoX, infoY, infoX + infoWidth, infoY + infoHeight);
    infoGrad.stop(0, '#FFFFFF')
      .stop(0.5, lightenColor(primaryColor, 97))
      .stop(1, '#FFFFFF');

    // Cadre principal avec ombre
    doc.rect(infoX + 3, infoY + 3, infoWidth, infoHeight)
      .fillOpacity(0.07)
      .fill('#000000')
      .fillOpacity(1);

    doc.roundedRect(infoX, infoY, infoWidth, infoHeight, 8)
      .fill(infoGrad);

    // Bordure élégante
    doc.roundedRect(infoX, infoY, infoWidth, infoHeight, 8)
      .lineWidth(1.5)
      .stroke(lightenColor(primaryColor, 50));

    // Titre de la section
    doc.font('Helvetica-Bold')
      .fontSize(12) // Taille réduite
      .fillColor(primaryColor);

    // Fond pour le titre de la section
    const titleWidth = 180; // Largeur réduite
    const titleHeight = 22; // Hauteur réduite
    const titleX = pageWidth / 2 - titleWidth / 2;

    doc.roundedRect(titleX, infoY - titleHeight / 2, titleWidth, titleHeight, 10)
      .fill('#FFFFFF')
      .lineWidth(1.5)
      .stroke(primaryColor);

    doc.text('CERTIFICATE DETAILS', titleX, infoY - 6, {
      width: titleWidth,
      align: 'center'
    });

    // Organisation en 2 colonnes au lieu de 4 pour le format portrait
    const colMiddle = infoX + infoWidth / 2;

    // Séparateur vertical pour les colonnes
    doc.moveTo(colMiddle, infoY + 15)
      .lineTo(colMiddle, infoY + infoHeight - 15)
      .lineWidth(0.5)
      .dash(1, { space: 2 })
      .stroke(lightenColor(primaryColor, 70))
      .undash();

    // Positions des éléments
    const leftCol = infoX + 15;
    const rightCol = colMiddle + 15;
    const row1Y = infoY + 25;
    const row2Y = infoY + 55;
    const row3Y = infoY + 85;

    // Colonne gauche, ligne 1 - ID du certificat
    drawIcon(doc, leftCol, row1Y, 'id', primaryColor);

    doc.font('Helvetica-Bold')
      .fontSize(9) // Taille réduite
      .fillColor('#555555')
      .text('CERTIFICATE ID', leftCol + 20, row1Y - 5);

    doc.font('Helvetica')
      .fontSize(9) // Taille réduite
      .fillColor('#333333')
      .text(certificateId, leftCol + 20, row1Y + 10, { width: colMiddle - leftCol - 30 });

    // Colonne gauche, ligne 2 - Date d'émission
    drawIcon(doc, leftCol, row2Y, 'calendar', primaryColor);

    doc.font('Helvetica-Bold')
      .fontSize(9)
      .fillColor('#555555')
      .text('ISSUE DATE', leftCol + 20, row2Y - 5);

    doc.font('Helvetica')
      .fontSize(9)
      .fillColor('#333333')
      .text(formatDate(issueDate), leftCol + 20, row2Y + 10);

    // Colonne gauche, ligne 3 - Accréditation
    drawIcon(doc, leftCol, row3Y, 'badge', secondaryColor);

    doc.font('Helvetica-Bold')
      .fontSize(9)
      .fillColor('#555555')
      .text('ACCREDITATION', leftCol + 20, row3Y - 5);

    doc.font('Helvetica')
      .fontSize(9)
      .fillColor('#333333')
      .text(accreditation, leftCol + 20, row3Y + 10, { width: colMiddle - leftCol - 30 });

    // Colonne droite, ligne 1 - Date d'achèvement
    drawIcon(doc, rightCol, row1Y, 'check', primaryColor);

    doc.font('Helvetica-Bold')
      .fontSize(9)
      .fillColor('#555555')
      .text('COMPLETION DATE', rightCol + 20, row1Y - 5);

    doc.font('Helvetica')
      .fontSize(9)
      .fillColor('#333333')
      .text(formatDate(completionDate), rightCol + 20, row1Y + 10);

    // Colonne droite, ligne 2 - Informations académiques
    drawIcon(doc, rightCol, row2Y, 'star', secondaryColor);

    doc.font('Helvetica-Bold')
      .fontSize(9)
      .fillColor('#555555')
      .text('ACADEMIC INFO', rightCol + 20, row2Y - 5);

    doc.font('Helvetica')
      .fontSize(9)
      .fillColor('#333333')
      .text(`${creditHours} credit hours, Grade: ${grade}`, rightCol + 20, row2Y + 10);

    // Colonne droite, ligne 3 - Validité ou URL de vérification
    if (expiryDate) {
      drawIcon(doc, rightCol, row3Y, 'hourglass', primaryColor);

      doc.font('Helvetica-Bold')
        .fontSize(9)
        .fillColor('#555555')
        .text('VALID UNTIL', rightCol + 20, row3Y - 5);

      doc.font('Helvetica')
        .fontSize(9)
        .fillColor('#333333')
        .text(formatDate(expiryDate), rightCol + 20, row3Y + 10);
    } else {
      drawIcon(doc, rightCol, row3Y, 'link', secondaryColor);

      doc.font('Helvetica-Bold')
        .fontSize(9)
        .fillColor('#555555')
        .text('VERIFY AT', rightCol + 20, row3Y - 5);

      doc.font('Helvetica')
        .fontSize(9)
        .fillColor('#333333')
        .text(verificationUrl, rightCol + 20, row3Y + 10, { width: infoX + infoWidth - rightCol - 30 });
    }

    // === 8. SECTION SIGNATURE ET QR CODE CÔTE À CÔTE ===
    const sigY = pageHeight - 130; // Position ajustée plus bas

    // Disposition en deux colonnes pour la signature et le QR code
    const leftColX = pageWidth / 2 - 150; // Colonne gauche pour la signature
    const rightColX = pageWidth / 2 + 50; // Colonne droite pour le QR code

    // === SIGNATURE (CÔTÉ GAUCHE) ===
    if (signaturePath && fs.existsSync(signaturePath)) {
      // Ombre de la signature
      doc.save();
      doc.translate(leftColX + 60, sigY + 5);
      doc.scale(1, 0.3); // Aplatir pour l'effet d'ombre
      doc.circle(0, 0, 40) // Taille réduite
        .fillOpacity(0.07)
        .fill('#000000')
        .fillOpacity(1);
      doc.restore();

      // Image de la signature
      doc.image(signaturePath, leftColX, sigY - 15, {
        width: 120, // Taille réduite
        align: 'center'
      });
    } else {
      // Texte de remplacement si pas de signature
      doc.font('Helvetica-Bold')
        .fontSize(14) // Taille réduite
        .fillColor('#95A5A6')
        .text('Signature', {
          width: 120,
          align: 'center',
          y: sigY,
          x: leftColX
        });
    }

    // Ligne de signature élégante
    doc.moveTo(leftColX, sigY + 30)
      .lineTo(leftColX + 120, sigY + 30)
      .lineWidth(1)
      .dash(1, { space: 1 })
      .stroke('#555555')
      .undash();

    // === QR CODE (CÔTÉ DROIT) ===
    if (qrCodeDataURL) {
      // Ajouter le QR code à côté de la signature
      doc.image(qrCodeDataURL, rightColX, sigY - 15, {
        width: 80 // Taille ajustée
      });

      // Texte explicatif sous le QR code
      doc.font('Helvetica')
        .fontSize(9) // Taille légèrement augmentée
        .fillColor('#555555')
        .text('Scan to verify', rightColX, sigY + 70, {
          width: 80,
          align: 'center'
        });
    }

    // === 10. PIED DE PAGE ===
    const footerY = pageHeight - 30;
    doc.font('Helvetica')
      .fontSize(8) // Taille réduite
      .fillColor('#777777')
      .text(`Verify this certificate at: ${verificationUrl}/${certificateId}`, {
        align: 'center',
        y: footerY
      });

    // Finaliser le document
    doc.end();

    // Gérer les événements de stream
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
}

/**
 * Éclaircit une couleur hexadécimale d'un certain pourcentage
 * @param {string} color - Couleur hexadécimale (ex: '#500E63')
 * @param {number} percent - Pourcentage d'éclaircissement (0-100)
 * @returns {string} - Couleur éclaircie
 */
function lightenColor(color, percent) {
  // Convertir la couleur hex en RGB
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  // Éclaircir chaque composante
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Convertir en hex et retourner
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Dessine un motif géométrique subtil en arrière-plan
 * @param {PDFDocument} doc - Document PDF
 * @param {number} width - Largeur du document
 * @param {number} height - Hauteur du document
 * @param {string} color - Couleur du motif
 * @param {number} opacity - Opacité du motif
 */
function drawBackgroundPattern(doc, width, height, color, opacity = 0.05) {
  doc.save();
  doc.fillOpacity(opacity);

  // Motif de points
  const spacing = 30;
  const radius = 1;

  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      doc.circle(x, y, radius).fill(color);
    }
  }

  // Quelques lignes diagonales très subtiles
  doc.strokeOpacity(opacity / 2);
  doc.lineWidth(0.5);

  for (let i = 0; i < width; i += spacing * 4) {
    doc.moveTo(i, 0)
      .lineTo(i + 100, 100)
      .stroke(color);

    doc.moveTo(i, height)
      .lineTo(i + 100, height - 100)
      .stroke(color);
  }

  doc.fillOpacity(1);
  doc.strokeOpacity(1);
  doc.restore();
}

/**
 * Dessine un effet de ruban dans un coin
 * @param {PDFDocument} doc - Document PDF
 * @param {number} x - Position X du coin
 * @param {number} y - Position Y du coin
 * @param {number} size - Taille du ruban
 * @param {string} color1 - Couleur principale
 * @param {string} color2 - Couleur secondaire
 * @param {number} rotation - Angle de rotation en degrés
 */
function drawRibbonCorner(doc, x, y, size, color1, color2, rotation = 0) {
  doc.save();
  doc.translate(x, y);

  if (rotation) {
    doc.rotate(rotation);
  }

  // Ruban principal
  doc.moveTo(0, 0)
    .lineTo(size, 0)
    .lineTo(0, size)
    .fill(color1);

  // Ombre du ruban
  doc.moveTo(0, size)
    .lineTo(size / 4, size * 3 / 4)
    .lineTo(size / 2, size)
    .fill(lightenColor(color1, -20)); // Assombrir la couleur

  // Accent du ruban
  doc.moveTo(size / 2, 0)
    .lineTo(size * 3 / 4, 0)
    .lineTo(0, size * 3 / 4)
    .lineTo(0, size / 2)
    .fill(color2);

  doc.restore();
}

/**
 * Dessine un motif décoratif élégant dans un coin du certificat
 * @param {PDFDocument} doc - Document PDF
 * @param {number} x - Position X du coin
 * @param {number} y - Position Y du coin
 * @param {string} color1 - Première couleur
 * @param {string} color2 - Deuxième couleur
 * @param {number} rotation - Angle de rotation en degrés
 */
function drawCornerDecoration(doc, x, y, color1, color2, rotation = 0) {
  doc.save();
  doc.translate(x, y);

  if (rotation) {
    doc.rotate(rotation);
  }

  // Élément décoratif principal
  doc.moveTo(0, 0)
    .lineTo(40, 0)
    .lineTo(0, 40)
    .fill(color1);

  // Accent décoratif
  doc.moveTo(0, 0)
    .lineTo(20, 0)
    .lineTo(0, 20)
    .fill(color2);

  // Cercle décoratif
  doc.circle(-5, -5, 10)
    .fill(lightenColor(color2, 20));

  // Petits cercles décoratifs
  for (let i = 1; i <= 3; i++) {
    doc.circle(i * 10, 5, 2)
      .fill(lightenColor(color1, 30));

    doc.circle(5, i * 10, 2)
      .fill(lightenColor(color2, 30));
  }

  doc.restore();
}

/**
 * Génère un ID de certificat unique et professionnel
 * @returns {string} - ID du certificat
 */
function generateCertificateId() {
  const prefix = 'SWAPP';
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  const checksum = calculateChecksum(`${prefix}${datePart}${randomPart}`);
  return `${prefix}-${datePart}-${randomPart}-${checksum}`;
}

/**
 * Calcule un checksum simple pour validation
 * @param {string} str - Chaîne à valider
 * @returns {string} - Checksum
 */
function calculateChecksum(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return (sum % 100).toString().padStart(2, '0');
}

/**
 * Dessine une icône simple
 * @param {PDFDocument} doc - Document PDF
 * @param {number} x - Position X de l'icône
 * @param {number} y - Position Y de l'icône
 * @param {string} type - Type d'icône à dessiner
 * @param {string} color - Couleur de l'icône
 */
function drawIcon(doc, x, y, type, color) {
  doc.save();
  doc.translate(x, y);

  const size = 12;

  switch (type) {
    case 'id':
      // Icône de carte d'identité
      doc.roundedRect(-size / 2, -size / 2, size, size * 0.8, 2)
        .lineWidth(1)
        .stroke(color);
      doc.rect(-size / 3, -size / 4, size * 2 / 3, size / 6)
        .fill(color);
      break;

    case 'calendar':
      // Icône de calendrier
      doc.roundedRect(-size / 2, -size / 2, size, size, 1)
        .lineWidth(1)
        .stroke(color);
      doc.moveTo(-size / 2, -size / 4)
        .lineTo(size / 2, -size / 4)
        .stroke(color);
      // Petits cercles pour les jours
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          doc.circle(-size / 4 + i * size / 2, -size / 8 + j * size / 3, size / 10)
            .fill(color);
        }
      }
      break;

    case 'check':
      // Icône de coche
      doc.circle(0, 0, size / 2)
        .lineWidth(1)
        .stroke(color);
      doc.moveTo(-size / 4, 0)
        .lineTo(-size / 8, size / 4)
        .lineTo(size / 3, -size / 4)
        .lineWidth(1.5)
        .stroke(color);
      break;

    case 'hourglass':
      // Icône de sablier
      doc.moveTo(-size / 2, -size / 2)
        .lineTo(size / 2, -size / 2)
        .lineTo(-size / 2, size / 2)
        .lineTo(size / 2, size / 2)
        .lineTo(-size / 2, -size / 2)
        .lineWidth(1)
        .stroke(color);
      break;

    case 'infinity':
      // Icône d'infini
      doc.save();
      doc.translate(0, 0);
      doc.scale(0.8, 0.8);
      doc.moveTo(-size / 2, 0)
        .bezierCurveTo(-size / 2, -size / 2, size / 2, -size / 2, size / 2, 0)
        .bezierCurveTo(size / 2, size / 2, -size / 2, size / 2, -size / 2, 0)
        .lineWidth(1.5)
        .stroke(color);
      doc.restore();
      break;

    case 'badge':
      // Icône de badge
      doc.circle(0, 0, size / 2)
        .lineWidth(1)
        .stroke(color);
      doc.moveTo(0, -size / 2)
        .lineTo(0, size / 2)
        .stroke(color);
      doc.moveTo(-size / 2, 0)
        .lineTo(size / 2, 0)
        .stroke(color);
      break;

    case 'clock':
      // Icône d'horloge
      doc.circle(0, 0, size / 2)
        .lineWidth(1)
        .stroke(color);
      doc.moveTo(0, 0)
        .lineTo(0, -size / 3)
        .stroke(color);
      doc.moveTo(0, 0)
        .lineTo(size / 4, size / 8)
        .stroke(color);
      break;

    case 'star':
      // Icône d'étoile
      const points = 5;
      const outerRadius = size / 2;
      const innerRadius = size / 4;

      let rot = Math.PI / 2 * 3;
      let step = Math.PI / points;

      doc.moveTo(0, -outerRadius);

      for (let i = 0; i < points; i++) {
        doc.lineTo(
          Math.cos(rot) * outerRadius,
          Math.sin(rot) * outerRadius
        );
        rot += step;

        doc.lineTo(
          Math.cos(rot) * innerRadius,
          Math.sin(rot) * innerRadius
        );
        rot += step;
      }

      doc.closePath()
        .lineWidth(1)
        .stroke(color);
      break;

    case 'link':
      // Icône de lien
      doc.save();
      doc.rotate(45);
      doc.roundedRect(-size / 4, -size / 2, size / 2, size, size / 4)
        .lineWidth(1)
        .stroke(color);
      doc.roundedRect(-size / 4, -size / 4, size / 2, size, size / 4)
        .lineWidth(1)
        .stroke(color);
      doc.restore();
      break;

    case 'email':
      // Icône d'email
      doc.roundedRect(-size / 2, -size / 3, size, size * 2 / 3, 2)
        .lineWidth(1)
        .stroke(color);
      // Symbole @
      doc.circle(0, 0, size / 6)
        .lineWidth(0.8)
        .stroke(color);
      doc.moveTo(-size / 4, -size / 4)
        .lineTo(size / 4, size / 4)
        .stroke(color);
      break;

    default:
      // Cercle par défaut
      doc.circle(0, 0, size / 2)
        .lineWidth(1)
        .stroke(color);
  }

  doc.restore();
}

/**
 * Formate une date en format lisible
 * @param {Date} date - Date à formater
 * @returns {string} - Date formatée
 */
function formatDate(date) {
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

module.exports = generateCertificatePdf;