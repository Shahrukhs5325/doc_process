import * as React from 'react';
import { Alert, Box, Stack, TableContainer, Typography } from '@mui/material';
import {
  Message,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';
import ButtonIcon from '../button/ButtonIcon';
import { PiChatCircleTextBold, PiDownloadBold, PiExportBold, PiEyeBold, PiPintGlassBold } from 'react-icons/pi';
import { useQuery } from '@tanstack/react-query';
import { deleteFiles, getAllFiles, splitFiles } from '../../apis/doc/docsApi';
import DocumentViwer from '../document/DocumentViwer';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';



type Props = {
};


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}


const DocumnetList: React.FC<Props> = () => {
  const navigate = useNavigate();

  const [files, setFiles] = React.useState<string>("");

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
    try {
      const res = await deleteFiles(fileKey);
      console.log(res?.data);

      refetch();

    } catch (err) {
      console.log('error deleteHandler : ', err);
    }
  }



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
    navigate(`/documents_extraction`, {
      state: {
        fileKey: fileKey
      }
    })
  }


  return (
    <>
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
                <TableCell component="th" scope="row" onClick={() => fileViewHandler(row?.fileKey)}>
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
                    onClick={() => setFiles(row?.fileDownloadLink)}>
                    {/* <PiEyeBold /> */}
                    <PiDownloadBold />
                  </ButtonIcon>
                </TableCell>
                <TableCell align="right">
                  <ButtonIcon
                    className="mr-0.5 text-gray"
                    onClick={() => deleteHandler(row?.fileKey)}>
                    <PiPintGlassBold />
                  </ButtonIcon>
                </TableCell>
                {/* <TableCell align="right">
                <a href={row?.fileDownloadLink}
                  className=" text-gray"
                  target="_blank"
                  rel="noopener noreferrer">
                  
                  <PiDownloadSimpleBold />
                 </a>
              </TableCell> */}
                <TableCell align="right">
                  <ButtonIcon
                    className="mr-0.5 text-gray"
                    onClick={() => fileViewHandler(row?.fileKey)}>

                    <PiExportBold />
                  </ButtonIcon>
                </TableCell>
                <TableCell align="right">
                  <ButtonIcon
                    className="mr-0.5 text-gray"
                    onClick={() => uploadDoc()}>
                    <PiChatCircleTextBold />
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
    </>
  );
}



export default DocumnetList;
