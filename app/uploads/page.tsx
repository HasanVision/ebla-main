'use client';
import type { NextPage } from "next";
import styles from "./page.module.scss";
import { ChangeEvent, useState, MouseEvent } from "react";
import Image from "next/image";

import { Inter } from "next/font/google";
import FileUploader from "../components/fileUpload/FileUploader";

const inter = Inter({ subsets: ["latin"] });

interface UploadFileHomeProps {
  isOpen?: boolean,
  onClose: () => void,

}


const UploadFileHome: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <div className={`${styles.container} ${inter.className}`}>
        <h1>File uploader</h1>
        <form>
          <div>
            <h3>Thumbnail</h3>
            <FileUploader
            />
          </div>
        </form>
      </div>
    </main>
  )
};

export default UploadFileHome;