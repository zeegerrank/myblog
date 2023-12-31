import api from "../api";import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormBox from "../components/FormBox";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/auth/login", { username, password });

      console.log("🚀 -> result.data:", result.data);

      console.log("🚀 -> result.headers:", result.headers);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <FormBox title="Login">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={handleUsernameChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={handlePasswordChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </FormBox>
    </div>
  );
};
export default Login;
