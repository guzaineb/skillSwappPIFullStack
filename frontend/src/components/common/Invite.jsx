import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

AOS.init();

function Invite() {
    const [email, setEmail] = React.useState(''); // State to capture email

    // Function to handle the email submission
    const handleInviteClick = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post("http://localhost:5000/api/invite/send-invitation", { email });
            console.log(response.data); // Log success response
            alert("Invitation sent successfully!"); // Optional: show success message to user
        } catch (error) {
            console.error("Error sending invitation:", error);
            alert("Failed to send invitation. Please try again.");
        }
    };
    return (
        <> 
            <header className="header">
                <div className="header-fixed">
                    <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
                        <div className="container">
                            <div className="navbar-header">
                                <a id="mobile_btn" href="javascript:void(0);">
                                    <span className="bar-icon">
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                </a>
                                <a href="index-2.html" className="navbar-brand logo">
                                    <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                                </a>
                            </div>
                            <div className="main-menu-wrapper">
                                <div className="menu-header">
                                    <a href="index-2.html" className="menu-logo">
                                        <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
                                    </a>
                                    <a id="menu_close" className="menu-close" href="javascript:void(0);">
                                        <i className="fas fa-times" />
                                    </a>
                                </div>
                                <ul className="main-nav">
                                    <li className="has-submenu active">
                                        <a className href="#">Home <i className="fas fa-chevron-down" /></a>
                                        <ul className="submenu">
                                            <li className="active"><a href="index-2.html">Home</a></li>
                                            <li><a href="index-two.html">Home Two</a></li>
                                            <li><a href="index-three.html">Home Three</a></li>
                                            <li><a href="index-four.html">Home Four</a></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="#">Instructor <i className="fas fa-chevron-down" /></a>
                                        <ul className="submenu">
                                            <li className="has-submenu">
                                                <a href="instructor-list.html">Instructor</a>
                                                <ul className="submenu">
                                                    <li><a href="instructor-list.html">List</a></li>
                                                    <li><a href="instructor-grid.html">Grid</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="instructor-dashboard.html">Dashboard</a></li>
                                            <li><a href="instructor-profile.html">My Profile</a></li>
                                            <li><a href="instructor-course.html">My Course</a></li>
                                            <li><a href="instructor-wishlist.html">Wishlist</a></li>
                                            <li><a href="instructor-reviews.html">Reviews</a></li>
                                            <li><a href="instructor-quiz.html">My Quiz Attempts</a></li>
                                            <li><a href="instructor-orders.html">Orders</a></li>
                                            <li><a href="instructor-qa.html">Question &amp; Answer</a></li>
                                            <li><a href="instructor-referral.html">Referrals</a></li>
                                            <li><a href="instructor-chat.html">Messages</a></li>
                                            <li><a href="instructor-tickets.html">Support Ticket</a></li>
                                            <li><a href="instructor-notifications.html">Notifications</a></li>
                                            <li><a href="instructor-settings.html">Settings</a></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="#">Student <i className="fas fa-chevron-down" /></a>
                                        <ul className="submenu first-submenu">
                                            <li className="has-submenu">
                                                <a href="students-list.html">Student</a>
                                                <ul className="submenu">
                                                    <li><a href="students-list.html">List</a></li>
                                                    <li><a href="students-grid.html">Grid</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="student-dashboard.html">Student Dashboard</a></li>
                                            <li><a href="student-profile.html">My Profile</a></li>
                                            <li><a href="student-courses.html">Enrolled Courses</a></li>
                                            <li><a href="student-wishlist.html">Wishlist</a></li>
                                            <li><a href="student-reviews.html">Reviews</a></li>
                                            <li><a href="student-quiz.html">My Quiz Attempts</a></li>
                                            <li><a href="student-order-history.html">Orders</a></li>
                                            <li><a href="student-qa.html">Question &amp; Answer</a></li>
                                            <li><a href="student-referral.html">Referrals</a></li>
                                            <li><a href="student-messages.html">Messages</a></li>
                                            <li><a href="student-tickets.html">Support Ticket</a></li>
                                            <li><a href="student-settings.html">Settings</a></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="#">Pages <i className="fas fa-chevron-down" /></a>
                                        <ul className="submenu">
                                            <li><a href="notifications.html">Notification</a></li>
                                            <li><a href="pricing-plan.html">Pricing Plan</a></li>
                                            <li><a href="wishlist.html">Wishlist</a></li>
                                            <li className="has-submenu">
                                                <a href="course-list.html">Course</a>
                                                <ul className="submenu">
                                                    <li><a href="add-course.html">Add Course</a></li>
                                                    <li><a href="course-list.html">Course List</a></li>
                                                    <li><a href="course-grid.html">Course Grid</a></li>
                                                    <li><a href="course-details.html">Course Details</a></li>
                                                </ul>
                                            </li>
                                            <li className="has-submenu">
                                                <a href="come-soon.html">Error</a>
                                                <ul className="submenu">
                                                    <li><a href="come-soon.html">Coming Soon</a></li>
                                                    <li><a href="error-404.html">404</a></li>
                                                    <li><a href="error-500.html">500</a></li>
                                                    <li><a href="under-construction.html">Under Construction</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="faq.html">FAQ</a></li>
                                            <li><a href="support.html">Support</a></li>
                                            <li><a href="job-category.html">Category</a></li>
                                            <li><a href="cart.html">Cart</a></li>
                                            <li><a href="checkout.html">Checkout</a></li>
                                            <li><a href="login.html">Login</a></li>
                                            <li><a href="register.html">Register</a></li>
                                            <li><a href="forgot-password.html">Forgot Password</a></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="#">Blog <i className="fas fa-chevron-down" /></a>
                                        <ul className="submenu">
                                            <li><a href="blog-list.html">Blog List</a></li>
                                            <li><a href="blog-grid.html">Blog Grid</a></li>
                                            <li><a href="blog-masonry.html">Blog Masonry</a></li>
                                            <li><a href="blog-modern.html">Blog Modern</a></li>
                                            <li><a href="blog-details.html">Blog Details</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <ul className="nav header-navbar-rht">
                                <li className="nav-item">
                                    <div>
                                        <a href="javascript:void(0);" id="dark-mode-toggle" className="dark-mode-toggle  ">
                                            <i className="fa-solid fa-moon" />
                                        </a>
                                        <a href="javascript:void(0);" id="light-mode-toggle" className="dark-mode-toggle ">
                                            <i className="fa-solid fa-sun" />
                                        </a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link header-login" to="/invite">Invite a friend</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="home-slide d-flex align-items-center">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-7">
                            <div className="home-slide-face aos" data-aos="fade-up">
                                <div className="home-slide-text ">
                                    <h1>Invite your friends to kick-start their learning journey!</h1>
                                </div>
                                <div className="banner-content">
                                    <form className="form" onSubmit={handleInviteClick}>
                                        <div className="form-inner">
                                            <div className="input-group d-flex">
                                                <i className="fa-solid fa-envelope search-icon z-1"/>
                                                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <button className="btn btn-primary sub-btn" type="submit"><i className="fas fa-arrow-right" /></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="trust-user">
                                    <p>Trusted by over 15K Users <br />worldwide since 2024</p>
                                    <div className="trust-rating d-flex align-items-center">
                                        <div className="rate-head">
                                            <h2><span>1000</span>+</h2>
                                        </div>
                                        <div className="rating d-flex align-items-center">
                                            <h2 className="d-inline-block average-rating">4.4</h2>
                                            <i className="fas fa-star filled" />
                                            <i className="fas fa-star filled" />
                                            <i className="fas fa-star filled" />
                                            <i className="fas fa-star filled" />
                                            <i className="fas fa-star filled" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 d-flex align-items-center">
                            <div className="girl-slide-img aos" data-aos="fade-up">
                                <img src="assets/img/object.png" alt="Img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>

    )
}

export default Invite