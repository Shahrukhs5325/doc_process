// @ts-nocheck
import * as React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import {
  Button,
  DropZone,
  Flex,
  Text,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import { uploadFiles } from '../../apis/doc/docsApi';
import { useNavigate } from 'react-router-dom';

//const acceptedFileTypes = ['image/png', 'image/jpeg','text/plain', 'application/pdf'];

const acceptedFileTypes: string[] = [
  'text/plain', // for .txt files
  'text/markdown', // for .md files
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // for .xlsx files
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // for .docx files
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // for .pptx files
  'application/pdf', // for .pdf files
  'text/csv' // for .csv files
];

type Props = {
  next?: (() => void) | undefined;
  handleBack?: (() => void) | undefined;
};


const UploadDocumnet: React.FC<Props> = ({ next, handleBack }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isUpload, setIsUpload] = React.useState<boolean>(false);


  const [files, setFiles] = React.useState<File[]>([]);
  const [errMsg, setErrMsg] = React.useState<string>("");


  const hiddenInput = React.useRef<HTMLInputElement | null>(null);

  const onFilePickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    setErrMsg("");
    setIsUpload(false);
    setFiles(Array.from(files));
  };

  const uploadDoc = async () => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setIsLoading(true);
        const fileContent = event?.target?.result?.split(",")[1]; // Get base64 content

        const payload = {
          file: fileContent,
          userEmail: "aa@yopmail.com",
          fileName: files?.[0]?.name,
        }
        const res = await uploadFiles(payload);
        if (res?.status === 200) {
          setIsUpload(true);
          /// navigate(`/documents_capture`);
        } else {
          setErrMsg(res?.data?.message);
        }
        setIsLoading(false);
      } catch (err) {
        setIsUpload(false);
        setIsLoading(false);
        setErrMsg(err?.message ? err?.message : "Server error");
        console.log('error deleteHandler : ', err);
      }
    };

    reader.readAsDataURL(files?.[0]);
  }

  const nextBtnHandler = () => {
    navigate(`/documents_capture`);
  }

  return (
    <Paper>
      <Stack gap={4} p={3}>

        <Stack direction={"row"} justifyContent={"end"} gap={4}>
          <Button isLoading={isLoading} isDisabled={!files.length || !!errMsg || isUpload} onClick={uploadDoc}>Upload</Button>
          <Button isDisabled={!!files.length && !isUpload} onClick={next}>Next</Button>
        </Stack>

        <DropZone
          acceptedFileTypes={acceptedFileTypes}
          onDropComplete={({ acceptedFiles }) => {
            setFiles(acceptedFiles);
          }}
        >
          <Flex direction="column" alignItems="center">
            <Text>Drag file here or</Text>
            <Button size="small" onClick={() => hiddenInput.current?.click()}>
              Browse
            </Button>
          </Flex>
          <VisuallyHidden>
            <input
              type="file"
              tabIndex={-1}
              ref={hiddenInput}
              onChange={onFilePickerChange}
              multiple={true}
              accept={acceptedFileTypes.join(',')}
            />
          </VisuallyHidden>
        </DropZone>
        {files.map((file, i) => (
          <Stack direction={"row"} justifyContent={"space-between"} className='mx-3' gap={4} key={i}>
            <Typography>{file.name}</Typography>
            <Typography>{file.type}</Typography>
            {/* <Typography>{`${(file.size)/ Math.pow(1024,3)}`}Mb</Typography> */}
          </Stack>
        ))}

        {errMsg && !isLoading && <Stack>
          <Typography color={"red"}>{errMsg}</Typography>
        </Stack>}
      </Stack>
    </Paper>
  );
}



export default UploadDocumnet;
