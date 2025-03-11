import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { TableCell } from '@mui/material';

export default function Droppable(props) {
  const {setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <TableCell sx={{border: 'none'}} ref={setNodeRef}>
      {props.children}
    </TableCell>
  );
}