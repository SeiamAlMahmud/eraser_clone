import React from 'react';
import WorkSpaceHeader from '../_components/WorkSpaceHeader';

const WorkSpace = () => {
  return (
    <div>
      <WorkSpaceHeader />

      {/* Workspace Layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document  */}
        <div className='h-screen'>a</div>
        {/* Canvas */}
        <div className='h-screen'>b</div>
      </div>
    </div>
  );
};

export default WorkSpace;
