import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';
import * as S from './Login.styles';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      // Use login directly from useAuth
      const userData = await login({ email, password });
      
      if (userData) {
        if (userData.role === 'restaurant_owner') {
          try {
            const restaurantsResponse = await fetch('/api/restaurants', {
              credentials: 'include'
            });

            if (!restaurantsResponse.ok) {
              throw new Error('Failed to fetch restaurants');
            }
            const restaurants = await restaurantsResponse.json();
            
            const myRestaurant = restaurants.find(
              (restaurant) => restaurant.ownerId === userData.id
            );
    
            if (myRestaurant) {
              navigate(`/restaurants/${myRestaurant._id}`);
            } else {
              setError('No restaurant found for this user');
            }
          } catch (error) {
            setError('Error fetching restaurant details');
          }
        } else {
          navigate('/restaurants');
        }
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <S.Container>
      <S.GlobalStyle />
      <S.FormSection>
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
            <S.PasswordContainer>
              <S.Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <S.PasswordToggle onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </S.PasswordToggle>
            </S.PasswordContainer>
          </S.InputGroup>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </S.SubmitButton>

          <S.LinksContainer>
            <S.StyledLink to="/forgot-password">Forgot Password?</S.StyledLink>
            <S.StyledLink to="/signup">Don't have an account? Sign up</S.StyledLink>
          </S.LinksContainer>
        </S.Form>
      </S.FormSection>

      <S.InfoSection>
        {/* <S.InfoTitle>University Restaurant Online Ordering</S.InfoTitle>
        {/* <S.InfoDescription>
          UniDash is an innovative online ordering system designed to enhance the food ordering experience for
          university students and staff. By enabling users to pre-order meals from university restaurants.
        </S.InfoDescription> */} 
      </S.InfoSection>
    </S.Container>
  );
};