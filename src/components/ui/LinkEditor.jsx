'use client';

import Image from 'next/image';
import emptyIllustration from '../../../public/images/illustration-empty.svg'
import SortableCard from './SortableCard';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function LinkEditor({ links, setLinks }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const addNewLink = () => {
    const newLink = {
      id: uuidv4(),
      platform: 'GitHub',
      url: '',
      error: "Can't be empty",
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (index, updated) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], ...updated };
    setLinks(newLinks);
  };

  const removeLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over.id);
      const newList = arrayMove(links, oldIndex, newIndex);
      setLinks(newList);
    }
  };

  const canSave =
    links.length > 0 &&
    links.every((l) => l.url.trim() !== '' && !l.error);

  return (
    <div className="flex flex-col h-full  shadow rounded-[12px]  justify-between">
      <div>
        <div className="p-[40px]">
          <h2 className="text-[32px] font-bold leading-[48px] text-[#333333] font-instrument">
            Customize your links
          </h2>
          <p className="text-base font-normal leading-[24px] text-[#737373] font-instrument max-w-[728px]">
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
        </div>


        <div className="w-full px-6 sm:px-10 flex  flex-col justify-center">
          <button
            onClick={addNewLink}
            className="w-full max-w-[728px] h-[46px] px-[27px] py-[11px] border border-violet-600 text-violet-700 text-base font-semibold leading-[24px] rounded-lg font-instrument hover:bg-violet-50 transition"
          >
            + Add new link
          </button>

          <div className="mt-6">
            {links.length === 0 ? (
              <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center px-6 py-10 mb-10">
                <Image
                  src={emptyIllustration}
                  alt="Empty illustration"
                  width={150}
                  height={150}
                  className="mb-6"
                />
                <h3 className="text-lg font-semibold text-gray-800">Let’s get you started</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Use the “Add new link” button to get started. Once you have more than one link,
                  you can reorder and edit them. We’re here to help you share your profiles with everyone!
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={links.map((link) => link.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {links.map((link, index) => (
                    <SortableCard
                      key={link.id}
                      id={link.id}
                      index={index}
                      data={link}
                      onUpdate={updateLink}
                      onRemove={removeLink}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>
      <div className="py-6 border-t border-[#D9D9D9]">
        <div className="flex justify-center md:justify-end">
          <button
            disabled={!canSave}
            className={`h-[46px] px-[27px] py-[11px] rounded-lg font-instrument text-base font-semibold leading-[24px] text-white transition
        ${canSave
                ? 'bg-violet-600 hover:bg-violet-700'
                : 'bg-violet-300 cursor-not-allowed'
              }
        w-[311px] md:w-[91px]
        mx-4 md:mx-0 md:mr-10
      `}
          >
            Save
          </button>
        </div>
      </div>


    </div>
  );
}
