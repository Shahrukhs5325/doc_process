/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import AppContent from "../components/auth/AppContent";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import DocumentsExtraction from "../components/Steps/DocumentsExtraction";
import DocumnetList from "../components/Steps/DocumnetList";
import UploadDocumnet from "../components/Steps/UploadDocumnet";

const AppRouter = () => {

    const PrivateRoutes = [
        { url: "/upload_documents", component: <UploadDocumnet /> },
        { url: "/documents_capture", component: <DocumnetList /> },
        { url: "/documents_extraction", component: <DocumentsExtraction /> },


    ]

    function NoMatch() {
        return (
            <div>
                <h2>Nothing to see here!</h2>
                <p className="cursor-pointer">
                    Go to the home page
                </p>
            </div>
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>
                <Route path="/" element={<AppContent />} >
                    {PrivateRoutes?.map((item, index) => {
                        return (
                            <Route path={item.url} element={item.component} key={index} />
                        );
                    })}
                    <Route path="*" element={<NoMatch />} />
                </Route>

            </Routes>
        </>
    );
};

export default AppRouter;
