'use client';
import React, { useEffect, useState } from 'react';
import WorkSpaceHeader from '../_components/WorkSpaceHeader';
import Editor from '../_components/Editor';

const WorkSpace = ({ params }: { params: Promise<{ fileId: string }> }) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setFileId(resolvedParams.fileId);
      // console.log(typeof resolvedParams.fileId, "params");
    });
  }, [params]);
  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      {/* Workspace Layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document  */}
        <div className="h-screen">
          <Editor triggerSave={triggerSave} fileId={fileId || ''} />
        </div>
        {/* Canvas */}
        <div className="h-screen">b</div>
      </div>
    </div>
  );
};

export default WorkSpace;
