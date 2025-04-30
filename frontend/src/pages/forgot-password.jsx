import { useParams, useNavigate } from "react-router-dom";
import ForgotPasswordEmailForm from "../components/forgetPassword/ForgotPasswordEmailForm";
import ForgetPasswordForm from "../components/forgetPassword/forgetPasswordForm";

export default function ForgotPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  // If token exists in URL, show reset form, otherwise show email form
  if (token) {
    return <ForgetPasswordForm token={token} />;
  }
  
  return <ForgotPasswordEmailForm />;
}