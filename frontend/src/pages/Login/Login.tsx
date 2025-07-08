import { Form, Input, Button, Divider } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigator = useNavigate();
  return (
    <div className="rounded-lg border-2 border-brand-primary bg-gray-100">
      <Form mode="card">
        <Form.Header>Please login</Form.Header>
        <Form.Item
          name="username"
          label="Username"
          help="Please enter your username for your account."
          required={false} // only control UI indication, not validation
          rules={[{ required: true }, { min: 6 }, { max: 30 }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          help="Please enter your password for your account."
          required={false} // only control UI indication, not validation
          rules={[{ required: true }, { min: 6 }, { max: 64 }]}
        >
          <Input type="password" placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button block color="primary" type="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Form mode="card">
        <Divider style={{ borderWidth: '1px', margin: '0' }} />
        <Form.Item>
          <Button
            block
            color="default"
            type="button"
            fill="outline"
            onClick={() => {
              navigator('/register');
            }}
          >
            {"Don't have an account? Register"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
