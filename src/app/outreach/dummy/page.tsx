import Layout from "../components/Layout";
import headerImg from "../../../../public/images/campaigns/BADG.webp";

const AboutPage: React.FC = () => {
  return (
    <Layout
      title="About Us"
      headerImage={headerImg}
      description="This page contains information about us"
    ></Layout>
  );
};

export default AboutPage;
