function SidebarS() {
  return (

<div className="col-xl-3 col-lg-3 theiaStickySidebar">
                <div className="settings-widget dash-profile">
                  <div className="settings-menu">
                    <div className="profile-bg">
                      <div className="profile-img">
                        <a href="Profile">
                          <img src="assets/img/user/NOUSSA.jpg" alt="Img" />
                        </a>
                      </div>
                    </div>
                    <div className="profile-group">
                      <div className="profile-name text-center">
                        <h4>
                          <a href="Profile">Sarra Maamar</a>
                        </h4>
                        <p>Student</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="settings-widget account-settings">
                  <div className="settings-menu">
                    <h3>Dashboard</h3>
                    <ul>
                     
                      <li className="nav-item active">
                        <a href="ProfileS" className="nav-link">
                          <i className="bx bxs-user" />
                          My Profile
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="CoursS" className="nav-link">
                          <i className="bx bxs-graduation" />
                          Enrolled Courses
                        </a>
                      </li>
                     
                     
                     
                      <li className="nav-item">
                        <a href="Quiz" className="nav-link">
                          <i className="bx bxs-shapes" />
                           Quiz
                        </a>
                      </li>

                      <li className="nav-item">
                        <a href="WishList" className="nav-link">
                          <i className="bx bxs-shapes" />
                          WishList
                        </a>
                      </li>

                     
                     
                    </ul>
                    <h3>Account Settings</h3>
                    <ul>
                     
                      <li className="nav-item">
                        <a href="Logout" className="nav-link">
                          <i className="bx bxs-log-out" />
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
               );
              }
              
export default SidebarS;