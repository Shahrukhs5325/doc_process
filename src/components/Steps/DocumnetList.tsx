// @ts-nocheck
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@aws-amplify/ui-react';
import { CircularProgress, Paper, Stack, TableContainer, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import * as React from 'react';
import { PiChatCircleText, PiDownload, PiExport, PiPintGlass } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { deleteFiles, getAllFiles, splitFiles } from '../../apis/doc/docsApi';
import ButtonIcon from '../button/ButtonIcon';



type Props = {
  next?: (() => void) | undefined;
  handleBack?: (() => void) | undefined;
};



const DocumnetList: React.FC<Props> = ({ next, handleBack }) => {
  const navigate = useNavigate();

  const [files, setFiles] = React.useState<string>("");
  const [loadingDelete, setLoadingDelete] = React.useState<{ [key: string]: boolean }>({});

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['all_files',],
    queryFn: () => getAllFiles(),
  });



  const uploadDoc = () => {

  }

  const deleteHandler = async (fileKey: string) => {
    setLoadingDelete((prev) => ({ ...prev, [fileKey]: true }));
    try {
      const res = await deleteFiles(fileKey);
      console.log(res?.data);
      refetch();
    } catch (err) {
      console.log('error deleteHandler : ', err);
    } finally {
      setLoadingDelete((prev) => ({ ...prev, [fileKey]: false }));
    }
  };



  const expandFileHandler = async (fileKey: string) => {
    try {
      const res = await splitFiles(fileKey);
      console.log(res?.data);

      refetch();

    } catch (err) {
      console.log('error expandFileHandler : ', err);
    }
  }

  const fileViewHandler = async (fileKey: string) => {
    next()
    navigate(`/documents_extraction`, {
      state: {
        fileKey: fileKey
      }
    })
  }


  return (
    !isLoading ? <>
      {!!data?.data.length ?
        <Paper>
          <Stack gap={4} p={3}>
            <Stack direction={"row"} justifyContent={"end"} gap={3}>
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={() => refetch()}>Refresh</Button>
            </Stack>

            <TableContainer >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant='body1'>Name</Typography></TableCell>
                    <TableCell><Typography variant='body1'>Type</Typography></TableCell>
                    <TableCell><Typography variant='body1'>Size</Typography></TableCell>
                    <TableCell><Typography variant='body1'>Date</Typography></TableCell>
                    <TableCell><Typography variant='body1'>Download</Typography></TableCell>
                    <TableCell><Typography variant='body1'>Delete</Typography></TableCell>
                    <TableCell><Typography variant='body1'>Expand</Typography></TableCell>
                    <TableCell><Typography variant='body1'>Chat</Typography></TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data && data?.data?.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant='body2'>{row?.fileName}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant='body2'>{row?.fileType}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant='body2'>{row?.fileSize}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant='body2'>{moment(row?.fileLastModified).format('DD-MM-YYYY HH:mm')}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        <ButtonIcon
                          className="mr-0.5 text-black"
                          onClick={() => setFiles(row?.fileDownloadLink)}>
                          {/* <PiEyeBold /> */}
                          <PiDownload />
                        </ButtonIcon>
                      </TableCell>
                      <TableCell align="right">
                        <ButtonIcon
                          className="mr-0.5 text-black"
                          onClick={() => deleteHandler(row?.fileKey)} disabled={loadingDelete[row?.fileKey]}
                        >
                          {loadingDelete[row?.fileKey] ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            <PiPintGlass />
                          )}
                        </ButtonIcon>
                      </TableCell>
                      {/* <TableCell align="right">
                <a href={row?.fileDownloadLink}
                  className=" text-black"
                  target="_blank"
                  rel="noopener noreferrer">
                  
                  <PiDownloadSimpleBold />
                 </a>
              </TableCell> */}
                      <TableCell align="right">
                        <ButtonIcon
                          disabled={row?.fileType != "pdf"}
                          className="mr-0.5 text-black"
                          onClick={() => fileViewHandler(row?.fileKey)}>
                          <PiExport />
                        </ButtonIcon>
                      </TableCell>
                      <TableCell align="right">
                        <ButtonIcon
                          className="mr-0.5 text-black"
                          onClick={() => uploadDoc()}>
                          <PiChatCircleText />
                        </ButtonIcon>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Box>
        <DocumentViwer open={!!files} url={files} />
      </Box> */}
          </Stack>
        </Paper> :
        <Stack height={340} justifyContent={"center"} alignItems={"center"}>
          <Typography variant='body2'>Data Not Found</Typography>
        </Stack>}
    </> :
      <Stack height={340} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress size={24} color="inherit" />
      </Stack>
  );
}



export default DocumnetList;
