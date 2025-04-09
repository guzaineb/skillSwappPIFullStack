function SidebarT() {
    return (
      <div className="col-xl-3 col-lg-3 theiaStickySidebar">
        <div className="settings-widget dash-profile">
          <div className="settings-menu">
            <div className="profile-bg">
              <div className="profile-img">
                <a href="/Profile">
                  <img src="assets/img/user/zinob.jpg" alt="Img" />
                </a>
              </div>
            </div>
            <div className="profile-group">
              <div className="profile-name text-center">
                <h4>
                  <a href="/Profile">Zaineb Guesmi</a>
                </h4>
                <p>Teacher</p>
              </div>
            </div>
          </div>
        </div>
        <div className="settings-widget account-settings">
          <div className="settings-menu">
            <h3>Dashboard</h3>
            <ul>
              
              <li className="nav-item">
                <a href="/Profile" className="nav-link">
                  <i className="bx bxs-user" />
                  My Profile
                </a>
              </li>
             
              
             
              <li className="nav-item">
                <a href="/Cours" className="nav-link">
                  <i className="bx bxs-cart" />
                  Cours
                </a>
              </li>
              <li className="nav-item">
                <a href="/Question" className="nav-link">
                  <i className="bx bxs-cart" />
                  Question
                </a>
              </li>



              
              <li className="nav-item">
                <a href="/CreateQuiz" className="nav-link">
                  <i className="bx bxs-chat" />
                  Create Quiz
                </a>
              </li>
              <li className="nav-item">
                <a href="/Quiz" className="nav-link">
                  <i className="bx bxs-coupon" />
                  Quiz
                </a>
              </li>

              <li className="nav-item">
                <a href="/Quizzes" className="nav-link">
                  <i className="bx bxs-coupon" />
                  All Quizzes
                </a>
              </li>

            </ul>
            <h3>Account Settings</h3>
            <ul>
              
              <li className="nav-item">
                <a href="/Logout" className="nav-link">
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
  
  export default SidebarT;
  