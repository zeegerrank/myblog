import { Card } from "react-bootstrap";
const FormBox = ({ children, title }) => {
  return (
    <Card className="w-50 mx-auto px-2 py-2">
      <Card.Body>
        <Card.Title className="mb-4">{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
};
export default FormBox;
