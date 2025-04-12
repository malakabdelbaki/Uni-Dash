import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';
import * as S from './Signup.styles';

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('All fields are required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { token, user } = await registerUser(formData);
      login({ token, ...user });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <S.GlobalStyle />
      <S.Container>
        <S.FormSection>
          <S.LogoContainer>
            <S.LogoUni>Uni</S.LogoUni>
            <S.LogoDash>Dash</S.LogoDash>
          </S.LogoContainer>

          <S.Title>Sign up</S.Title>
          <S.Subtitle>Enter your data that you will use for entering.</S.Subtitle>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <S.Form onSubmit={handleSubmit}>
            <S.InputGroup>
              <S.Label>Full Name</S.Label>
              <S.Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Email</S.Label>
              <S.Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Phone</S.Label>
              <S.Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+20"
                required
              />
            </S.InputGroup>

            <S.InputGroup span>
              <S.Label>Account Type</S.Label>
              <S.RadioGroup>
                <S.RadioLabel>
                  <S.RadioInput
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                  />
                  Student
                </S.RadioLabel>

                <S.RadioLabel>
                  <S.RadioInput
                    type="radio"
                    name="role"
                    value="staff"
                    checked={formData.role === 'staff'}
                    onChange={handleChange}
                  />
                  Staff
                </S.RadioLabel>

                <S.RadioLabel>
                  <S.RadioInput
                    type="radio"
                    name="role"
                    value="restaurant_owner"
                    checked={formData.role === 'restaurant_owner'}
                    onChange={handleChange}
                  />
                  Restaurant Owner
                </S.RadioLabel>
              </S.RadioGroup>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Password</S.Label>
              <S.PasswordWrapper>
                <S.Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="min. 8 characters"
                  minLength="8"
                  required
                />
                <S.EyeIconWrapper onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </S.EyeIconWrapper>
              </S.PasswordWrapper>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Confirm Password</S.Label>
              <S.PasswordWrapper>
                <S.Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="min. 8 characters"
                  minLength="8"
                  required
                />
                <S.EyeIconWrapper onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </S.EyeIconWrapper>
              </S.PasswordWrapper>
            </S.InputGroup>

            <S.SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </S.SubmitButton>

            <S.SignUpText>
              Already have an account? <S.Link href="/Login">Login</S.Link>
            </S.SignUpText>
          </S.Form>
        </S.FormSection>
      </S.Container>
    </>
  );
};