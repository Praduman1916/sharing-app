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
    touchAction: 'none'
  };

  return (


    // Enable drag-and-drop from the entire card area (including non-drag-icon parts)
    // This provides a more flexible experience—users can initiate drag from anywhere on the card.
    <div ref={setNodeRef} style={style} >
      <EditableLinkCard {...props} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>

    //  Restrict drag-and-drop to the drag icon only
    // <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-action-none">
    //   <EditableLinkCard {...props} />
    // </div>

  );
}
