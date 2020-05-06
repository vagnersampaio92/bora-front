import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";

const FileList = ({ files, onDelete }) => (
  <Container>
  
      <li key={files.id}>
        <FileInfo>
          <Preview src={files.preview} />
         
        </FileInfo>

        <div>
          {/* {!uploadedFile.uploaded &&
            !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#7159c1" }
                }}
                strokeWidth={10}
                percentage={uploadedFile.progress}
              />
            )} */}

          {files.url && (
            <a
              href={files.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

          {files.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
          {files.error && <MdError size={24} color="#e57878" />}
        </div>
      </li>
   
  </Container>
);

export default FileList;
