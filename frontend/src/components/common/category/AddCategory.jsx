import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


function AddCategory() {
    const navigate = useNavigate();
    const [errorlist, setError] = useState({});
    const [categoryInput, setCategoryInput] = useState({
        title: '',
        description: '',
    });
    const [picture, setPicture] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    // Handle input field changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setCategoryInput(prev => ({ ...prev, [name]: value }));

        // Remove error when user starts typing
        if (errorlist[name]) {
            setError(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Handle image file selection
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture({ image: file });
            setImageName(file.name);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Form submit handler
    const AddCategorySubmit = async (e) => {
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
        if (!picture) {
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
        formData.append('image', picture?.image);

        try {
            const res = await axios.post('http://localhost:5000/api/category/addCategory', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                },
            });

            if (res.data.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/');
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: 'Network error. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <>  
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>

        <div>
            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">Create Category</h1>
                                <div className="pagination-wrapper">
                                    <a href="index-2.html">Home</a>
                                    <i className="fa-regular fa-chevron-right" />
                                    <a className="active" href="create-course.html">Create Category</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="crea-te-course-area-start ptb--100">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-8">
                            <div className="create-course-area-main-wrapper-inner">
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Category Info
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <div className="course-information-area">
                                                    <form onSubmit={AddCategorySubmit} className="top-form-create-course">
                                                        <div className="single-input">
                                                            <label htmlFor="name">Category Title</label>
                                                            <input
                                                                id="name"
                                                                name="title"
                                                                onChange={handleInput}
                                                                value={categoryInput.title}
                                                                type="text"
                                                                placeholder="New Category"
                                                                style={{ border: errorlist.title ? "2px solid red" : "" }}
                                                            />
                                                            {errorlist.title && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.title}</p>}
                                                        </div>

                                                        <div className="single-input">
                                                            <label htmlFor="message-2">About Category</label>
                                                            <textarea
                                                                id="message-2"
                                                                name="description"
                                                                onChange={handleInput}
                                                                value={categoryInput.description}
                                                                placeholder="New Course"
                                                                style={{ border: errorlist.description ? "2px solid red" : "" }}
                                                            />
                                                            {errorlist.description && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.description}</p>}
                                                        </div>

                                                        <div className="single-input">
                                                            <label htmlFor="image">Category Image</label>
                                                            <input
                                                                type="file"
                                                                id="image"
                                                                name="image"
                                                                onChange={handleImage}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div className="course-thumbnail-upload-area">
                                                                <div className="thumbnail-area">
                                                                    <img src={imagePreview} alt="Selected" style={{ width: "250px", height: "250px", objectFit: "cover", border: errorlist.image ? "2px solid red" : "" }} />
                                                                </div>
                                                                <div className="information">
                                                                    <button type="button" className="rts-btn btn-primary" onClick={() => document.getElementById("image").click()}>
                                                                        Pick Image
                                                                    </button>
                                                                    {imageName && <p>Selected Image: {imageName}</p>}
                                                                </div>
                                                            </div>
                                                            {errorlist.image && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.image}</p>}
                                                        </div>

                                                        <div className="preview-course-button-area">
                                                            <button type="submit" className="rts-btn btn-border">Submit <i className="fa-light fa-arrow-right" /></button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 rts-sticky-column-item">
                            <div className="course-upload-tips-wrapper theiaStickySidebar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
        </>
    );
}


export default AddCategory;
