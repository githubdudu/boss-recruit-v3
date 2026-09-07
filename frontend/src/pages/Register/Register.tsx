import { Form, Input, Button, Divider } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigator = useNavigate();
  return (
    <div className="rounded-lg border-2 border-brand-primary bg-gray-100">
      <Form mode="card">
        <Form.Header>Create an account</Form.Header>
        <Form.Item
          name="username"
          label="Username"
          help="Please create a unique username for your account as login ID."
          required={false} // only control UI indication, not validation
          rules={[{ required: true }, { min: 6 }, { max: 30 }]}
        >
          <Input placeholder="Create your username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          help="The password must be at least 6 characters long, containing letters, numbers, and special characters."
          required={false} // only control UI indication, not validation
          rules={[{ required: true }, { min: 6 }, { max: 64 }]}
        >
          <Input type="password" placeholder="Create your password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          help="Please confirm your password."
          required={false} // only control UI indication, not validation
          rules={[{ required: true }, { min: 6 }, { max: 64 }]}
        >
          <Input type="password" placeholder="Re-enter your password" />
        </Form.Item>
        <Form.Item>
          <Button block color="primary" type="submit">
            Continue
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
              navigator('/login');
            }}
          >
            {'Having an account? Login'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
