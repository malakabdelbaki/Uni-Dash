import  {LoginForm} from '../components/Login/LoginForm';
import { AuthLayout } from '../layouts/AuthLayout';

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;