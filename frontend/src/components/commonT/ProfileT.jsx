import Footer from "../Footer";
import HeaderT from "../HeaderT";
import SidebarT from "../SidebarT";

function ProfileT() {
  return (
    <>
      <div className="main-wrapper">
        <HeaderT />
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">My Profile</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index-2.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        My Profile
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              {/* sidebar */}
              <SidebarT />
              {/* /Sidebar */}
              {/* Student Profile */}
              <div className="col-xl-9 col-lg-9">
                <div className="settings-widget card-details mb-0">
                  <div className="settings-menu p-0">
                    <div className="profile-heading">
                      <h3>My Profile</h3>
                    </div>
                    <div className="checkout-form personal-address">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>First Name</h6>
                            <p>Zaineb</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Last Name</h6>
                            <p>Guesmi</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>User Name</h6>
                            <p>Teacher Zaineb</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Email</h6>
                            <p>
                              <a
                                href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="2350575647464d5747464e4c63465b424e534f460d404c4e"
                              >
                                [zainebGuesmi&nbsp;@gmail.com]
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="contact-info">
                            <h6>Phone Number</h6>
                            <p>111111111</p>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="contact-info mb-0">
                            <h6>Bio</h6>
                            <p>
                              Hello! I am Zaineb Guesmi. I am passionate about
                              developing innovative software solutions,
                              analyzing classic literature. I aspire to become a
                              software developer, work as an editor. In my free
                              time, I enjoy coding, reading, hiking etc.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Student Profile */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default ProfileT;
