const Task = require("../models/task.model");
const Application = require("../models/application.model");
const { analyzeCv } = require("../advancedChatbot");
const fs = require("fs");

exports.createTask = async (req, res) => {
  try {
    const { title, description, compensation, category } = req.body;
    const owner = req.user._id; // ID de l'utilisateur connecté

    // Créer une nouvelle tâche
    const newTask = new Task({
      title,
      owner,
      description,
      compensation,
      category,
    });

    // Enregistrer la tâche dans la base de données
    await newTask.save();

    res.status(201).json({ message: "Tâche créée avec succès", task: newTask });
  } catch (error) {
    console.error("Erreur lors de la création de la tâche:", error);
    res.status(500).json({ message: "Erreur lors de la création de la tâche" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("owner", "name email");

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tâches" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate([
      { path: "owner", select: "name email" },
      { path: "applications", populate: "candidate" },
    ]);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Erreur lors de la récupération de la tâche:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la tâche" });
  }
};

exports.getTasksByOwner = async (req, res) => {
  try {
    const ownerId = req.params.id; // ID de l'utilisateur connecté
    const tasks = await Task.find({ owner: ownerId }).populate("owner", "name");

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tâches" });
  }
};

exports.applyToTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const candidateId = req.user._id; // ID de l'utilisateur connecté

    // Vérifier si la tâche existe
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    // Vérifier si l'utilisateur a déjà postulé à cette tâche
    const existingApplication = await Application.findOne({
      task: taskId,
      candidate: candidateId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà postulé à cette tâche" });
    }

    const newApplication = new Application({
      task: taskId,
      candidate: candidateId,
      status: "pending",
      candidate_cv: req.file.filename,
    });

    await newApplication.save();

    task.applications.push(newApplication._id);
    await task.save();

    res.status(201).json({
      message: "Candidature envoyée avec succès",
      application: newApplication,
    });
  } catch (error) {
    console.error("Erreur lors de la candidature à la tâche:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la candidature à la tâche" });
  }
};

exports.analyzeCv = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Vérifier si la tâche existe
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    const cvPath = req.file ? req.file.path : null;
    if (!cvPath) {
      return res.status(400).json({ message: "CV non fourni" });
    }
    const analysisResult = await analyzeCv(cvPath, task.description);

    res.status(200).json({
      message: "Analyse du CV réussie",
      analysisResult,
    });
  } catch (e) {
    console.error("Erreur lors de l'analyse du CV:", e);
    res.status(500).json({ message: "Erreur lors de l'analyse du CV" });
  }
};


exports.acceptApplication = async (req, res) => {
  try {
    const { applicationId } = req.body;
    const taskId = req.params.id;

    // Vérifier si la tâche existe
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    // Vérifier si la candidature existe
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }
    // Mettre à jour le statut de la candidature
    application.status = "accepted";
    await application.save();
    // Mettre à jour la tâche pour indiquer qu'elle a été acceptée
    task.state = "in_progress";
    await task.save();
    res.status(200).json({
      message: "Candidature acceptée avec succès",
      application,
    });
  } catch (error) {
    console.error("Erreur lors de l'acceptation de la candidature:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'acceptation de la candidature" });
  }
};