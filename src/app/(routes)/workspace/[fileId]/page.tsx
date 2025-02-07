"use client";
import React, { useState } from 'react';
import WorkSpaceHeader from '../_components/WorkSpaceHeader';
import Editor from '../_components/Editor';

const WorkSpace = () => {
  const [triggerSave, setTriggerSave] = useState(false)
  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      {/* Workspace Layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document  */}
        <div className="h-screen">
          <Editor triggerSave={triggerSave} />
        </div>
        {/* Canvas */}
        <div className="h-screen">b</div>
      </div>
    </div>
  );
};

export default WorkSpace;
