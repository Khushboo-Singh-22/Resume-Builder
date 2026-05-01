import Layout from "../components/layout";
import AnalysisPage from "../components/AnalysisPage";
import AnalysisNavbar from "../components/AnalysisNavbar";

export default function Analysis() {

    return (

        <Layout showFooter={false} showNavbar={false}>
            <AnalysisNavbar />
            <AnalysisPage />
        </Layout>

    );

}