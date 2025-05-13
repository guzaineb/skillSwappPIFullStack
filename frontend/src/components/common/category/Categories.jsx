import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Browse Job By Categories";
    axios.get(`http://localhost:5000/api/category/categories`)
      .then(res => {
        if (res.status === 200) {
          setCategories(res.data);
        }
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        Swal.fire('Error', 'Failed to load categories', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007C00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/category/deleteCategory/${id}`)
          .then(res => {
            if (res.status === 200) {
              Swal.fire('Deleted!', 'Category has been deleted.', 'success');
              setCategories(prev => prev.filter(cat => cat._id !== id));
            }
          })
          .catch(() => {
            Swal.fire('Error!', 'Could not delete category.', 'error');
          });
      }
    });
  };

  return (
    <section className="page-content py-5">
      <div className="container">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Browse Job By Categories</h2>
            <p className="text-muted">Find jobs by exploring different categories</p>
          </div>
          <Link to="/Profile/AddCategory" className="btn btn-primary">Add Category</Link>
        </header>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading categories...</p>
          </div>
        ) : (
          <div className="row">
            {categories.length > 0 ? (
              categories.map(category => (
                <div className="col-lg-4 col-md-6 mb-4" key={category._id}>
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={`http://localhost:5000${category.image}`}
                      alt={`Image of ${category.title}`}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{category.title}</h5>
                      <p className="card-text">{category.description}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-end gap-2 bg-white border-top-0">
                      <Link to={`/Profile/UpdateCategory/${category._id}`} className="btn btn-sm btn-outline-primary">
                        <i className="fa fa-edit me-1"></i>Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="fa fa-trash me-1"></i>Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">No categories found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;
