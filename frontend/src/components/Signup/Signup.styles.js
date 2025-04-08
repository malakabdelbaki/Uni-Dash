import styled from 'styled-components';

// Reuse styles from Login.styles.js where possible
export {
  FormContainer,
  LogoContainer,
  LogoUni,
  LogoDash,
  Title,
  Subtitle,
  InputGroup,
  Label,
  Input,
  PasswordWrapper,
  EyeIcon,
  SubmitButton,
  FooterLinks,
  Link,
  SignUpText,
  ErrorMessage
} from '../Login/Login.styles';

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

// Add new styles for radio buttons
export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #545563;
  cursor: pointer;
`;