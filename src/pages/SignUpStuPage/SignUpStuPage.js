import { useState } from "react";
import SignUpStuForm from "../../components/STU/SignUpStuForm";
import { SignedIn } from "../../components/EmptyStates/EmptyStates";
import { Loading } from "../../components/EmptyStates/EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignUpStuPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  function isSignedIn() {
    if (currentUser) {
      return (
        <SignedIn>To sign up as an NUS student, please sign out first</SignedIn>
      );
    } else {
      return <SignUpStuForm setLoading={setLoading} />;
    }
  }

  if (loading) {
    return <Loading>Signing you up...</Loading>;
  }

  return <>{isSignedIn()}</>;
};
export default SignUpStuPage;
