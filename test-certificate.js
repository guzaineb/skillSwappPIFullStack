const path = require('path');
const fs = require('fs');
const generateCertificatePdf = require('./backend/utils/generateCertificatePdf');

/**
 * Script de test pour générer un certificat d'exemple au format A4
 */
async function testCertificateGeneration() {
  try {
    console.log("=== GÉNÉRATION DE CERTIFICAT AU FORMAT A4 ===");

    // Chemin de sortie pour le certificat
    const outputPath = path.join(__dirname, 'certificate_a4_test.pdf');

    // Supprimer le fichier s'il existe déjà
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
      console.log("Ancien fichier supprimé");
    }

    console.log("Génération du certificat en cours...");

    // Générer le certificat avec des données d'exemple
    const certificatePath = await generateCertificatePdf({
      // Informations du bénéficiaire
      userName: "Jean Dupont",
      field: "Développement Web Full Stack",
      completionDate: new Date(),
      creditHours: 120,
      grade: "A+",

      // Options de sortie
      outputPath,

      // Options de style personnalisées
      primaryColor: '#3B0764',
      secondaryColor: '#047857',
      accentColor: '#DC2626',

      // Informations supplémentaires
      signatoryName: "Prof. Marie Martin",
      signatoryTitle: "Directrice de la Formation",
      signatoryEmail: "formation@skillswapp.com",

      // Informations de l'organisation
      organizationName: "SkillSwapp Academy",
      organizationTagline: "Apprendre, Partager, Réussir",
      accreditation: "Conseil National de la Formation Professionnelle",

      // Date d'expiration (optionnelle)
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
    });

    // Vérifier que le fichier a bien été créé
    if (fs.existsSync(certificatePath)) {
      const stats = fs.statSync(certificatePath);
      const fileSizeInKB = stats.size / 1024;

      console.log(`Certificat généré avec succès: ${certificatePath}`);
      console.log(`Taille du fichier: ${fileSizeInKB.toFixed(2)} KB`);
      console.log("Format: A4 (210mm x 297mm)");
      console.log("Le certificat est prêt à être imprimé sur une page A4 standard");
    } else {
      console.error("Le fichier n'a pas été créé correctement");
    }
  } catch (error) {
    console.error('Erreur lors de la génération du certificat:', error);
  }
}

// Exécuter le test
testCertificateGeneration();
