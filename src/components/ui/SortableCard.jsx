'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditableLinkCard from './EditableLinkCard';

export default function SortableCard(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <EditableLinkCard {...props} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}
