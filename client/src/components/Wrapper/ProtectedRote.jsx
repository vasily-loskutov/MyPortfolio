import { useSelector } from "react-redux";

import { getLoggStatus } from "@store/loggSlice";
import LogInForm from "../LogInForm/LogInForm";

const ProtectedRoute = ({ children }) => {
  const isLogg = useSelector(getLoggStatus());

  if (isLogg) {
    return children;
  }

  return <LogInForm />;
};

export default ProtectedRoute;
