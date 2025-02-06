import React, { createContext, useContext, useState } from 'react';

// Define the type for context
interface FileListContextType {
  fileLlist_: FILE[];
  setFileList_: React.Dispatch<React.SetStateAction<FILE[]>>;
}
export interface FILE {
  _id: string;
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _creationTime: string;
}
// Create context with the correct type
const FileListContext = createContext<FileListContextType | null>(null);

const FileListProvider = ({ children }: { children: React.ReactNode }) => {
  const [fileLlist_, setFileList_] = useState<FILE[]>([]);

  return (
    <FileListContext.Provider value={{ fileLlist_, setFileList_ }}>
      {children}
    </FileListContext.Provider>
  );
};

// Custom hook to use the context
export const useFileList = () => {
  const context = useContext(FileListContext);
  if (!context) {
    throw new Error('useFileList must be used within a FileListProvider');
  }
  return context;
};

export { FileListProvider };
