// LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import * as S from './Login.styles';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { token, user } = await loginUser({ email, password });
      setUser({ token, ...user });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.FormContainer>
      <S.LogoContainer>
        <S.LogoUni>Uni</S.LogoUni>
        <S.LogoDash>Dash</S.LogoDash>
      </S.LogoContainer>
      
      <S.Title>Login</S.Title>
      <S.Subtitle>Sign in with your registration data</S.Subtitle>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      <S.Form onSubmit={handleSubmit}>
        <S.InputGroup>
          <S.Label>Email</S.Label>
          <S.Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>Password</S.Label>
          <S.PasswordWrapper>
            <S.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="min. 8 characters"
              minLength="8"
              required
            />
            <S.EyeIcon />
          </S.PasswordWrapper>
        </S.InputGroup>

        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </S.SubmitButton>
      </S.Form>

      <S.FooterLinks>
        <S.Link to="/forgot-password">Forgot password?</S.Link>
        <S.SignUpText>
          Don't have an account? <S.Link to="/register">Sign up</S.Link>
        </S.SignUpText>
      </S.FooterLinks>
    </S.FormContainer>
  );
};