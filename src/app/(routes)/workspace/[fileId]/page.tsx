'use client';
import React, { useEffect, useState } from 'react';
import WorkSpaceHeader from '../_components/WorkSpaceHeader';
import Editor from '../_components/Editor';
import { useConvex } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { FILE } from '@/app/_context/FileListContext';

const dummyFile = {
  document: '',
  _id: '',
  archive: false,
  createdBy: '',
  fileName: '',
  teamId: '',
  whiteboard: '',
  _creationTime: '',
};

const WorkSpace = ({ params }: { params: Promise<{ fileId: string }> }) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);
  const [fileData, setFileData] = useState<FILE | undefined>();
  const convex = useConvex();
  useEffect(() => {
    params.then((resolvedParams) => {
      setFileId(resolvedParams.fileId);
      // console.log(typeof resolvedParams.fileId, "params");
    });
  }, [params]);

  useEffect(() => {
    if (fileId) {
      getFileData();
    }
  }, [fileId]);

  const getFileData = async () => {
    try {
      console.log(fileId, 'fileId545184');
      const result = await convex.query(api.files.getFileById, {
        _id: fileId as Id<'files'>,
      });
      setFileData(result);
      console.log(typeof result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      {/* Workspace Layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document  */}
        <div className="h-screen">
          <Editor
            triggerSave={triggerSave}
            fileId={fileId || ''}
            fileData={fileData || dummyFile}
          />
        </div>
        {/* Canvas */}
        <div className="h-screen">b</div>
      </div>
    </div>
  );
};

export default WorkSpace;
