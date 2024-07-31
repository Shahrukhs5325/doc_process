import * as React from 'react';
import { CircularProgress, Stack, TableContainer, Typography } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';
import ButtonIcon from '../button/ButtonIcon';
import { PiChatCircleTextBold, PiDownloadBold, PiPintGlassBold } from 'react-icons/pi';
import { useQuery } from '@tanstack/react-query';
import { deleteFiles, splitFiles } from '../../apis/doc/docsApi';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

type Props = {
  next?: (() => void) | undefined

};

const DocumentsExtraction: React.FC<Props> = ({next}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileKey = location?.state?.fileKey;

  const [files, setFiles] = React.useState<string>("");
  const [loadingDelete, setLoadingDelete] = React.useState<{ [key: string]: boolean }>({});

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['splits_files'],
    queryFn: () => splitFiles(fileKey),
  });

  const uploadDoc = () => {
    // Upload document logic here
  };

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

  return (
    !isLoading ? <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='body1'>Name</Typography></TableCell>
              <TableCell><Typography variant='body1'>Type</Typography></TableCell>
              <TableCell><Typography variant='body1'>Size</Typography></TableCell>
              <TableCell><Typography variant='body1'>Date</Typography></TableCell>
              <TableCell><Typography variant='body1'>Download</Typography></TableCell>
              <TableCell><Typography variant='body1'>Delete</Typography></TableCell>
              <TableCell><Typography variant='body1'>Chat</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data && data?.data.map((row, i) => (
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
                    className="mr-0.5 text-gray"
                    onClick={() => setFiles(row?.fileDownloadLink)}
                  >
                    <PiDownloadBold />
                  </ButtonIcon>
                </TableCell>
                <TableCell align="right">
                  <ButtonIcon
                    className="mr-0.5 text-gray"
                    onClick={() => deleteHandler(row?.fileKey)}
                    disabled={loadingDelete[row?.fileKey]}
                  >
                    {loadingDelete[row?.fileKey] ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <PiPintGlassBold />
                    )}
                  </ButtonIcon>
                </TableCell>
                <TableCell align="right">
                  <ButtonIcon
                    className="mr-0.5 text-gray"
                    onClick={() => {
                      uploadDoc();
                    }}
                  >
                    <PiChatCircleTextBold />
                  </ButtonIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </> :
      <Stack height={340} justifyContent={"center"} alignItems={"center"}>
        <CircularProgress size={24} color="inherit" />
      </Stack>
  );
};

export default DocumentsExtraction;
