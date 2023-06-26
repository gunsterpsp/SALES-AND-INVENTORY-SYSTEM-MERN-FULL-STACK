import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import "../assets/css/styles.css";

const ForgotPassword = () => {
  return (
    <>
    <div className="main-parent">
      <br /><br /><br /><br /><br />
      <Col lg="5" className="mx-auto">
        <Card className="bg-secondary shadow border-0" >
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center mb-4">
              <h3>Account Recovery</h3>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="" color="primary" type="button">
                  Reset
                </Button>
              </div>
            </Form>
            <Row className="mt-3">
              <Col xs="12">
                  <label style={{fontSize: "13px"}}>Already have an account?{' '}
                    <NavLink to="/">Login</NavLink>
                  </label>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      </div>
    </>
  );
};

export default ForgotPassword;
