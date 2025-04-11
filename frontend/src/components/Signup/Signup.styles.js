import styled, { createGlobalStyle } from 'styled-components';
import { Eye, EyeOff } from 'lucide-react'; 

export const GlobalStyle = createGlobalStyle`
  /* Modern CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    overflow: hidden;
  }

  body {
    height: 100%;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow: auto;
    background-color: #f5f5f5;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                 Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #fff;
  overflow: hidden;
`;

export const FormSection = styled.div`
  flex: 1;
  max-width: 800px;
  padding: 2rem;
  background: #fff;
  margin: 0 auto;
  overflow-y: auto;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
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
  text-align: center;
`;

export const Subtitle = styled.p`
  color: #545563;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-column: ${props => props.span ? '1 / -1' : 'auto'};
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: #545563;
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #c7c8d2;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #d79a27;
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

export const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #545563;
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #c7c8d2;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    border-color: #d79a27;
    background-color: #d79a27;
  }

  &:checked::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SubmitButton = styled.button`
  background: #d79a27;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;
  grid-column: 1 / -1;

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
  justify-content: center;
  margin-top: 1.5rem;
`;
export const Link = styled.a`
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
  text-align: center;
  grid-column: 1 / -1;
`;

export const ErrorMessage = styled.p`
  color: #d6212a;
  background: #fdecea;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  grid-column: 1 / -1;
`;

