import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import { toast } from 'react-toastify';
import './FaceDetection.css';

const FaceDetection = ({ videoRef, onExpressionDetected }) => {
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);
  const [currentExpression, setCurrentExpression] = useState(null);
  const detectionInterval = useRef(null);

  // Charger les modèles nécessaires
  useEffect(() => {
    const loadModels = async () => {
      try {
        // Définir le chemin des modèles
        const MODEL_URL = '/models';

        // Charger les modèles nécessaires
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);

        console.log('Modèles de détection faciale chargés avec succès');
        setModelsLoaded(true);
        toast.success('Détection faciale prête à être utilisée');
      } catch (error) {
        console.error('Erreur lors du chargement des modèles de détection faciale:', error);
        toast.error('Impossible de charger les modèles de détection faciale');
      }
    };

    loadModels();

    // Nettoyer l'intervalle lors du démontage du composant
    return () => {
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, []);

  // Démarrer/arrêter la détection
  const toggleDetection = () => {
    if (detectionActive) {
      // Arrêter la détection
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
        detectionInterval.current = null;
      }
      setDetectionActive(false);
      toast.info('Détection faciale désactivée');
    } else {
      // Démarrer la détection
      if (modelsLoaded && videoRef.current) {
        startDetection();
        setDetectionActive(true);
        toast.info('Détection faciale activée');
      } else {
        toast.warning('Impossible de démarrer la détection faciale. Vérifiez que la caméra est activée.');
      }
    }
  };

  // Fonction pour démarrer la détection
  const startDetection = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.width || video.videoWidth || 640, height: video.height || video.videoHeight || 480 };

    // Ajuster la taille du canvas à celle de la vidéo
    faceapi.matchDimensions(canvas, displaySize);

    // Démarrer la détection à intervalles réguliers
    detectionInterval.current = setInterval(async () => {
      if (video.paused || video.ended || !modelsLoaded) return;

      try {
        // Détecter les visages avec les expressions
        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        )
          .withFaceLandmarks()
          .withFaceExpressions();

        // Redimensionner les détections
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // Effacer le canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner les détections
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        // Traiter les expressions détectées
        if (resizedDetections.length > 0) {
          const expressions = resizedDetections[0].expressions;
          const maxExpression = Object.entries(expressions).reduce(
            (max, [expression, probability]) =>
              probability > max.probability ? { expression, probability } : max,
            { expression: null, probability: 0 }
          );

          // Si l'expression a une probabilité suffisante
          if (maxExpression.probability > 0.7) {
            // Si l'expression a changé
            if (maxExpression.expression !== currentExpression) {
              setCurrentExpression(maxExpression.expression);

              // Notifier le composant parent
              if (onExpressionDetected) {
                onExpressionDetected(maxExpression.expression, maxExpression.probability);
              }

              // Afficher une notification pour certaines expressions
              if (['happy', 'surprised', 'angry'].includes(maxExpression.expression)) {
                const expressionMap = {
                  happy: 'sourire',
                  surprised: 'surprise',
                  angry: 'colère',
                  sad: 'tristesse',
                  fearful: 'peur',
                  disgusted: 'dégoût',
                  neutral: 'neutre'
                };

                toast.info(`Expression détectée : ${expressionMap[maxExpression.expression]}`);

                // Créer une notification pour les autres participants via le composant parent
                if (onExpressionDetected) {
                  onExpressionDetected(maxExpression.expression, maxExpression.probability);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors de la détection faciale:', error);
      }
    }, 100); // Intervalle de détection (100ms = 10 fois par seconde)
  };

  return (
    <div className="face-detection-container">
      <canvas
        ref={canvasRef}
        className="face-detection-canvas"
        width={videoRef.current?.width || videoRef.current?.videoWidth || 640}
        height={videoRef.current?.height || videoRef.current?.videoHeight || 480}
      />
      <button
        className={`face-detection-toggle ${detectionActive ? 'active' : ''}`}
        onClick={toggleDetection}
        disabled={!modelsLoaded}
      >
        {detectionActive ? 'Désactiver' : 'Activer'} la détection faciale
      </button>
      {currentExpression && (
        <div className={`current-expression expression-${currentExpression}`}>
          Expression: {currentExpression}
        </div>
      )}
    </div>
  );
};

export default FaceDetection;
