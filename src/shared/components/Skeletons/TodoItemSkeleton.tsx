import React from "react";
import { Skeleton, Stack } from "@mui/material";

const TodoItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-start space-x-2 p-2 border rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
      <Skeleton variant="circular" width={24} height={24} />
      <div className="flex-grow flex flex-col">
        <Stack spacing={1}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Stack>
      </div>

      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="circular" width={24} height={24} />
      </Stack>
    </div>
  );
};

export default TodoItemSkeleton;
