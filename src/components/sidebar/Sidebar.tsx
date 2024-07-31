import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { Card } from "@aws-amplify/ui-react";
import { Outlet, useNavigate } from "react-router-dom";
import UploadDocumnet from "../Steps/UploadDocumnet";
import DocumnetList from "../Steps/DocumnetList";
import DocumentsExtraction from "../Steps/DocumentsExtraction";



type Props = {

};

const STEPS = [
    {
        step: 0,
        name: "Upload Documents",
        path: "upload_documents",
    },
    {
        step: 1,
        name: "Documents Capture",
        path: "documents_capture",
    },
    // {
    //     step: 2,
    //     name: "Documents Classification",
    //     path: "documents_classification"
    // },
    {
        step: 3,
        name: "Documents Extraction",
        path: "documents_extraction",
    },
    {
        step: 4,
        name: "Documents Details",
        path: "documents_details",
    },
];

const Sidebar: React.FC<Props> = () => {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});


    const totalSteps = React.useCallback(() => STEPS.length, []);
    const completedSteps = React.useCallback(
        () => Object.keys(completed).length,
        [completed]
    );

    const isLastStep = React.useCallback(
        () => activeStep === totalSteps() - 1,
        [activeStep, totalSteps]
    );

    const allStepsCompleted = React.useCallback(
        () => completedSteps() === totalSteps(),
        [completedSteps, totalSteps]
    );

    const handleNext = React.useCallback(() => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                STEPS.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    }, [activeStep, allStepsCompleted, completed, isLastStep]);

    const handleBack = React.useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, []);

    const handleStep = React.useCallback(
        (step: number) => {
            setActiveStep(step);
            //navigate(`/${STEPS[step].path}`);
        },
        [navigate]
    );

    const handleComplete = React.useCallback(() => {
        setCompleted((prevCompleted) => ({
            ...prevCompleted,
            [activeStep]: true,
        }));
        handleNext();
    }, [activeStep, handleNext]);

    const handleReset = React.useCallback(() => {
        setActiveStep(0);
        setCompleted({});
    }, []);

    const next = () => {
        handleNext();
    }


    return (
        <Grid container spacing={2}>

            <Grid item xs={3}>

                <Stack sx={{ position: 'relative', top: '-80px', left: '40px', }}>
                    <Paper>
                        <Card >
                            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
                                {STEPS.map((e, index) => (
                                    <Step key={index} completed={completed[index]}>
                                        <StepButton onClick={() => {
                                            handleStep(index);
                                            navigate(`/${e.path}`);
                                        }}>
                                            <Typography>Step {index + 1}</Typography>
                                            <Typography>{e?.name}</Typography>
                                        </StepButton>
                                    </Step>
                                ))}
                            </Stepper>
                        </Card>
                    </Paper>
                </Stack>

            </Grid>


            <Grid item xs={9}>

                <Stack sx={{ mx: 6 }}>
                    <Stack sx={{ position: 'relative', top: '-80px', left: '10px' }}>
                        <Typography color={"white"} variant="h5">{STEPS[activeStep].name}</Typography>
                    </Stack>
                    <Paper>
                        {STEPS[activeStep].path === "upload_documents" ? (
                            <UploadDocumnet next={next} />
                        ) : STEPS[activeStep].path === "documents_capture" ? (
                            <DocumnetList next={next} />
                        ) : STEPS[activeStep].path === "documents_extraction" ? (
                            // <DocumentsExtraction next={next} />
                            <Outlet/>
                        ) : null}
                    </Paper>
                </Stack>
            </Grid>
        </Grid>
    );
}
export default Sidebar;
