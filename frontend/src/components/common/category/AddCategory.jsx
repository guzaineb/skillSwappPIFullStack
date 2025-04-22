import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddCategory({ existingCategorie = null }) {
    const navigate = useNavigate();
    const [categoryInput, setCategoryInput] = useState({
        title: '',
        description: '',
   
    });
    const [errorlist, setError] = useState({});
    const [picture, setPicture] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCategoryInput((prev) => ({ ...prev, [name]: value }));

        if (errorlist[name]) {
            const newErrors = { ...errorlist };
            delete newErrors[name];
            setError(newErrors);
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const AddCategorySubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const errors = {};
        const missingFields = [];

        if (!categoryInput.title) {
            errors.title = "Le titre est requis.";
            missingFields.push("Titre");
        }
        if (!categoryInput.description) {
            errors.description = "La description est requise.";
            missingFields.push("Description");
        }
        if (!picture) {
            errors.image = "L'image est requise.";
            missingFields.push("Image");
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            Swal.fire({
                title: 'Erreur !',
                text: `Veuillez remplir les champs suivants : ${missingFields.join(", ")}`,
                icon: 'error',
                confirmButtonText: 'OK',
            });
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', categoryInput.title);
        formData.append('description', categoryInput.description);
        formData.append('status', categoryInput.status);
        formData.append('image', picture);

        try {
            const res = await axios.post('http://localhost:5000/api/category/addCategory', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                },
            });

            if (res.data.status === 201) {
                Swal.fire({
                    title: 'Succès !',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/Profile/Categories');
                });
            } else {
                throw new Error('Erreur lors de la création');
            }
        } catch (err) {
            Swal.fire({
                title: 'Erreur !',
                text: 'Une erreur réseau est survenue. Veuillez réessayer plus tard.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={AddCategorySubmit} className="card p-4">
            <h1 className="mb-4">Ajouter une Catégorie</h1>

            <div className="mb-3">
                <label className="form-label">Titre</label>
                <input
                    type="text"
                    name="title"
                    className={`form-control ${errorlist.title ? 'is-invalid' : ''}`}
                    value={categoryInput.title}
                    onChange={handleInput}
                />
                {errorlist.title && <div className="invalid-feedback">{errorlist.title}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    rows="3"
                    className={`form-control ${errorlist.description ? 'is-invalid' : ''}`}
                    value={categoryInput.description}
                    onChange={handleInput}
                />
                {errorlist.description && <div className="invalid-feedback">{errorlist.description}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                    type="file"
                    accept="image/*"
                    className={`form-control ${errorlist.image ? 'is-invalid' : ''}`}
                    onChange={handleImage}
                />
                {errorlist.image && <div className="invalid-feedback">{errorlist.image}</div>}
            </div>

            {imagePreview && (
                <div className="mb-3">
                    <img src={imagePreview} alt="Aperçu" className="img-fluid rounded" style={{ maxWidth: '200px' }} />
                </div>
            )}
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi...' : (existingCategorie ? 'Mettre à jour' : 'Créer')}
            </button>
        </form>
    );
}

export default AddCategory;
