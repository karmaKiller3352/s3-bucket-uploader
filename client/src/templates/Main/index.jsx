import { useEffect } from "react";

import PageHeader from "../components/PageHeader";
import PageWrapper from "../components/PageWrapper";

const Main = ({ children, pageTitle, docTitle }) => {
  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  return (
    <div className="main-container">
      <PageHeader />
      <PageWrapper pageTitle={pageTitle}>{children}</PageWrapper>
    </div>
  );
};

export default Main;
