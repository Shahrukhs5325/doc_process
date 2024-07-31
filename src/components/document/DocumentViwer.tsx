import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

type Props = {
  open: boolean;
  url: string;
};

const DocumentViwer: React.FC<Props> = ({ open, url }) => {
  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
  };

  return (
    <React.Fragment>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DocViewer documents={
            {
              uri: "https://idp-upload-and-split-bucket.s3.amazonaws.com/USER/USER-aa%40yopmail.com/UPLOAD/2024/JULY/30/7-1-2024%20ZAPS%20Rewards%20meeting%20notes-xlsx-7c47c3ff-f098-477e-ab30-09f99d17d22d/Main-File/7-1-2024%20ZAPS%20Rewards%20meeting%20notes.xlsx?AWSAccessKeyId=ASIAXYKJQMUZZN4H6O7E&Expires=1722407633&Signature=5g9b29537Y5dggPoY7KYozP5PVw%3D&X-Amzn-Trace-Id=Root%3D1-66a9ccc1-189865a6118c01d500a46951%3BParent%3D28d953a3199dc009%3BSampled%3D0%3BLineage%3D0cefc475%3A0&x-amz-security-token=IQoJb3JpZ2luX2VjEG4aCXVzLWVhc3QtMSJHMEUCIFQpZbL9%2B2wSeStiFupgsX45r41ahlCxj8uwv7WmuDCwAiEAnNlZqW6ueEXRzpAHI0kS07QVDaCtKdmsx9O8QC9n0d0qowMIVxAAGgw1MzMyNjY5ODIxOTUiDDc5BfEL397CEQHS2iqAAx5%2B5YPzaL88hckLxL11XCOq8gNy%2FYj2VdOf%2FSSWi7H5TGLTOA9DNf3DqzK6etNDSrVViON%2BgunOH9X0hc0av3yayLCIofr8xCz%2Bol%2FeLNbrcfrNgfHuzLNBqXPXeCeDml0wCWsbJZtA%2FxRgiDChfgtxTDOwYqH6XmHJxuJUXr1HzeJkaRvOmPi3JWafAvIy0VIU9N%2Fa1pYa2t75%2FO9J4P6xC7AJVSpBgBjjWmarMBbncCl0ZTw35qN70sV9Qjm96Jzjqmnu3vbenW6GSpniLqXR4HWflMQguAZETSAdyj8xhmj6usMZQaAnVzmnHxgYmIiV1V53%2F6sYXQas908q4PFS%2FaomDcGxPEHYm4BRUx3413Y0kDLBHFNg71pb68HlKe%2BRssNnljqPUZg9XDnnIRNLtKOUI00h1YKByL8HKIeuhZRNCoYKT30lSZg0ll8Q8wENF0byni65I1In5euFD8rnJk%2BOPQSDCRlMT5fkpDYhE4m5bKt0fydxC8HdZ0WvPjCQmae1BjqdAbXDbYS26VDawCusIJKy9zYObRO6wOvhogBuJghggThJMuXG8aSRk3XAEMmSEScZm0SrmdIfmkF%2Bqmj71npllS2fWYCkPDKubwN0tfFMtwFgA53vbozPfq5gylm75eLBoHdTim61g46RzT3IZ17J3KHX8RFTSFlf1xvxvIdmfbx%2B1ynSD1UTf%2FyjVhvNY%2F%2FC2DOmXMstc1CDk4rasAA%3D"
            }}
            pluginRenderers={DocViewerRenderers} />
        </DialogContent>

      </Dialog>
    </React.Fragment>
  );
};

export default DocumentViwer;
