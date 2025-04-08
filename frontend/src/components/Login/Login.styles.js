import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Subtitle = styled.p`
  color: #545563;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

export const EyeIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: url('eye-icon.svg') no-repeat center;
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
`;

export const ErrorMessage = styled.p`
  color: #d6212a;
  background: #fdecea;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;