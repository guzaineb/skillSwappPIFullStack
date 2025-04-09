function Sidebar() {
  return (
    <div className="col-xl-3 col-lg-3 theiaStickySidebar">
      <div className="settings-widget dash-profile">
        <div className="settings-menu">
          <div className="profile-bg">
            <div className="profile-img">
              <a href="/Profile">
                <img src="assets/img/user/user16.jpg" alt="Img" />
              </a>
            </div>
          </div>
          <div className="profile-group">
            <div className="profile-name text-center">
              <h4>
                <a href="/Profile">Mariem Tlili</a>
              </h4>
              <p>ADMIN</p>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-widget account-settings">
        <div className="settings-menu">
          <h3>Dashboard</h3>
          <ul>
            <li className="nav-item">
              <a href="/Dashboard" className="nav-link">
                <i className="bx bxs-tachometer" />
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a href="/Profile" className="nav-link">
                <i className="bx bxs-user" />
                My Profile
              </a>
            </li>
           
            <li className="nav-item">
              <a href="/Reviews" className="nav-link">
                <i className="bx bxs-star" />
                Reviews
              </a>
            </li>
           
            <li className="nav-item">
              <a href="/OrderHistory" className="nav-link">
                <i className="bx bxs-cart" />
                Order History
              </a>
            </li>
           
            <li className="nav-item">
              <a href="/Referral" className="nav-link">
                <i className="bx bxs-user-plus" />
                Referrals
              </a>
            </li>
            <li className="nav-item">
              <a href="/Message" className="nav-link">
                <i className="bx bxs-chat" />
                Messages
              </a>
            </li>
            <li className="nav-item">
              <a href="/Tickets" className="nav-link">
                <i className="bx bxs-coupon" />
                Support Tickets
              </a>
            </li>
          </ul>
          <h3>Account Settings</h3>
          <ul>
            <li className="nav-item">
              <a href="/Settings" className="nav-link ">
                <i className="bx bxs-cog" />
                Settings
              </a>
            </li>
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

export default Sidebar;
