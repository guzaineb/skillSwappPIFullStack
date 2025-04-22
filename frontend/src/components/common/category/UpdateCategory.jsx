import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function UpdateCategory() {
    const { id } = useParams(); // Get the category ID from the URL
    const navigate = useNavigate();
    const [errorlist, setError] = useState({});
    const [categoryInput, setCategory] = useState({
        title: '',
        description: '',
    });
    const [picture, setPicture] = useState(null);
    const [imageName, setImageName] = useState(""); // Store selected image name
    const [imagePreview, setImagePreview] = useState("assets/images/dashboard/05.png"); // Default image

    useEffect(() => {
        axios.get(`http://localhost:5000/api/category/category/${id}`)
            .then(res => {
                if (res.status === 201) {
                    setCategory(res.data.category);
                    setImagePreview(`http://localhost:5000${res.data.category.image}`);
                }
            })
            .catch(error => {
                console.error("Error fetching category:", error);
            });
    }, [id]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });

        if (errorlist[e.target.name]) {
            setError((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture({ image: file });
            setImageName(file.name); // Store the selected image name
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const UpdateCategorySubmit = (e) => {
        e.preventDefault();

        let errors = {};
        let missingFields = [];

        if (!categoryInput.title) {
            errors.title = "Title is required";
            missingFields.push("Title");
        }
        if (!categoryInput.description) {
            errors.description = "Description is required";
            missingFields.push("Description");
        }
        if (!picture && !categoryInput.image) {
            errors.image = "Image is required";
            missingFields.push("Image");
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);

            Swal.fire({
                title: 'Error!',
                text: `Please fill in the following fields: ${missingFields.join(", ")}`,
                icon: 'error',
                confirmButtonText: 'OK',
            });

            return;
        }

        const formData = new FormData();
        formData.append('title', categoryInput.title);
        formData.append('description', categoryInput.description);
        if (picture) {
            formData.append('image', picture.image);
        }

        axios.put(`http://localhost:5000/api/category/updateCategory/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
        }).then(res => {
            if (res.data.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/Profile/Categories');
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        }).catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'Network error. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };

    return (
        <div className="container mt-5">
            {/* breadcrumb area */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Update Category
                    </li>
                </ol>
            </nav>

            <h1 className="mb-4">Update Category</h1>

            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={UpdateCategorySubmit}>
                                {/* Category Title */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Category Title</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        className={`form-control ${errorlist.title ? 'is-invalid' : ''}`}
                                        value={categoryInput.title}
                                        onChange={handleInput}
                                        placeholder="Enter Category Title"
                                    />
                                    {errorlist.title && <div className="invalid-feedback">{errorlist.title}</div>}
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        className={`form-control ${errorlist.description ? 'is-invalid' : ''}`}
                                        value={categoryInput.description}
                                        onChange={handleInput}
                                        placeholder="Enter Category Description"
                                    />
                                    {errorlist.description && <div className="invalid-feedback">{errorlist.description}</div>}
                                </div>

                                {/* Image upload */}
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Category Image</label>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={handleImage}
                                        style={{ display: "none" }}
                                    />
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={imagePreview}
                                            alt="Selected"
                                            className="img-thumbnail"
                                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-primary ms-3"
                                            onClick={() => document.getElementById('image').click()}
                                        >
                                            Pick Image
                                        </button>
                                    </div>
                                    {imageName && <div className="mt-2">Selected Image: {imageName}</div>}
                                    {errorlist.image && <div className="invalid-feedback d-block">{errorlist.image}</div>}
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary">Update Category</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/Profile/Categories')}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCategory;
