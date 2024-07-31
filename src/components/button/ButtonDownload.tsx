import React from 'react';
import ButtonIcon from './ButtonIcon';
import { BaseProps } from '../@types/common';
import { PiFileDoc } from 'react-icons/pi';
import {
  Document,
  Packer,
  Paragraph,
  TextRun
} from "docx";
import { saveAs } from "file-saver";

type Props = BaseProps & {
  messages: any;
  text: string;
};

const ButtonDownload: React.FC<Props> = (props) => {

  const createDoc = () => {

    const paragraph = props.messages.map((o: { role: string; content: { body: string; }[]; }) => (
      new TextRun({
        text: o?.role === 'user' ? "Query: " + o.content[0].body + "\n\n" : "Response:\n" + o.content[0].body + "\n\n\n\n",
        bold: o?.role === 'user' ? true : false,
        size: 16
      })
    ));

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // new Paragraph(props.query),
            new Paragraph({
              children: paragraph
            })
          ]
        }
      ]
    });


    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "cloudhub-doc.docx");
    });
  };

  return (
    <ButtonIcon
      className={props.className}
      onClick={() => {
        createDoc();
      }}>
      <PiFileDoc />
    </ButtonIcon>
  );
};

export default ButtonDownload;
