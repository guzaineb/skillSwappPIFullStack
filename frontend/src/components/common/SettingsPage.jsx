import React, { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  // Appliquer le thème au chargement
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Container fluid className="pt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mb-3">Theme Settings</h2>
          <p className="text-muted">Choose a theme for your chat interface</p>

          {/* Liste des thèmes */}
          <Row className="g-2">
            {THEMES.map((t) => (
              <Col key={t} xs={4} sm={3} md={2}>
                <Button
                  variant={theme === t ? "primary" : "outline-secondary"}
                  className="w-100 p-2 text-capitalize"
                  onClick={() => setTheme(t)}
                >
                  {t}
                </Button>
              </Col>
            ))}
          </Row>

          {/* Preview Section */}
          <h3 className="mt-4">Preview</h3>
          <Card className="shadow-sm">
            <Card.Header className="d-flex align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                J
              </div>
              <div className="ms-2">
                <h6 className="mb-0">John Doe</h6>
                <small className="text-muted">Online</small>
              </div>
            </Card.Header>

            <Card.Body className="overflow-auto" style={{ minHeight: "200px", maxHeight: "200px" }}>
              {PREVIEW_MESSAGES.map((message) => (
                <div key={message.id} className={`d-flex ${message.isSent ? "justify-content-end" : "justify-content-start"} mb-2`}>
                  <div className={`p-2 rounded-3 ${message.isSent ? "bg-primary text-white" : "bg-light"}`} style={{ maxWidth: "80%" }}>
                    <p className="mb-1">{message.content}</p>
                    <small className="text-muted">12:00 PM</small>
                  </div>
                </div>
              ))}
            </Card.Body>

            <Card.Footer>
              <InputGroup>
                <Form.Control type="text" placeholder="Type a message..." readOnly value="This is a preview" />
                <Button variant="primary">
                  <Send size={18} />
                </Button>
              </InputGroup>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
