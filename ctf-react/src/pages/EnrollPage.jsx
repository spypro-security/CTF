
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EnrollForm from "./EnrollForm";

function EnrollPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const target = location.state && location.state.target ? location.state.target : "/practice";
  const workshopType = location.state && location.state.workshopType ? location.state.workshopType : "Practice";

  const handleSubmitSuccess = () => {
    navigate(target, { replace: true });
  };

  const handleCancel = () => {
    navigate("/practice", { replace: true });
  };

  return (
    <EnrollForm
      onSubmitSuccess={handleSubmitSuccess}
      onCancel={handleCancel}
      workshopType={workshopType}
    />
  );
}

export default EnrollPage;
