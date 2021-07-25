import { useState } from "react";
import SignUpOrgForm from "../../components/ORG/SignUpOrgForm";
import { SignedIn } from "../../components/EmptyStates/EmptyStates";
import { Loading } from "../../components/EmptyStates/EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignUpOrgPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  function isSignedIn() {
    if (currentUser) {
      return (
        <SignedIn>
          To sign up as an organization, please sign out first
        </SignedIn>
      );
    } else {
      return <SignUpOrgForm setLoading={setLoading} />;
    }
  }

  if (loading) {
    return <Loading>Signing you up...</Loading>;
  }

  return <>{isSignedIn()}</>;
};

export default SignUpOrgPage;
