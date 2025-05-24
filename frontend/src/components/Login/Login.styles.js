import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  /* Modern CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul {
    list-style: none;
  }

  /* Remove form control defaults */
  input, textarea, select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Remove animations */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Base styles */
  body {
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                 Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f5f5f5;
  }

  /* Font face for Nunito - if you're using it */
  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    src: local('Nunito Regular'), local('Nunito-Regular'),
         url('https://fonts.gstatic.com/s/nunito/v16/XRXV3I6Li01BKofINeaE.ttf') format('truetype');
  }
`;


// ... rest of your styled components remain the same
export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #fff;
`;

export const FormSection = styled.div`
  flex: 0 0 50%; // Changed from 65% to 50%
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  background: #fff;

  @media (max-width: 1024px) {
    flex: 0 0 100%;
    padding: 2rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 480px;
  margin: 0 auto 2rem;
`;

export const LogoUni = styled.span`
  font-family: 'Nunito-Bold', sans-serif;
  font-size: 40px;
  color: #d6212a;
`;

export const LogoDash = styled.span`
  font-family: 'Nunito-Bold', sans-serif;
  font-size: 30px;
  color: #d79a27;
  margin-left: 8px;
  align-self: flex-end;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #231f20;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Subtitle = styled.p`
  color: #545563;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem; // Reduced from 1.5rem
  padding: 0 1rem;
`;

export const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 0.75rem; // Reduced from 1.5rem
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #545563;
  font-weight: 600;
  margin-bottom: 0.25rem; // Reduced from 0.5rem
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #c7c8d2;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  margin-top: 0.25rem;

  &:focus {
    outline: none;
    border-color: #d79a27;
    box-shadow: 0 0 0 2px rgba(215, 154, 39, 0.1);
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const EyeIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #545563;
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: #d79a27;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;

  &:hover {
    background: #c68a1f;
  }

  &:disabled {
    background: #d79a27;
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const StyledLink = styled(RouterLink)`
  color: #d6212a;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SignUpText = styled.p`
  color: #545563;
`;

export const ErrorMessage = styled.p`
  color: #d6212a;
  background: #fdecea;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

export const InfoSection = styled.div`
  display: none;

  @media (min-width: 1024px) {
    flex: 0 0 50%; // Changed from 35% to 50%
    display: flex;
    background: url('/home.png') no-repeat center center;
    background-size: cover;
    flex-direction: column;
    justify-content: center;
    color: white;
  }
`;

export const InfoTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const InfoDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

export const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #545563;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #231f20;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

