import { SignupForm } from '../components/Signup/SignupForm';
import { AuthLayout } from '../layouts/AuthLayout';

const SignupPage = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};
export default SignupPage;