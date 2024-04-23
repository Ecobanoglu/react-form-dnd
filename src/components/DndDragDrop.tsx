import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Input, Button } from "src/components/ui";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "src/components/ui/form";

import { IOption } from "src/lib/types";

interface IDndItem {}

interface IDndItem {
  options: IOption[];
  form: any;
  handleUpdateText: (a: number, item: IOption, b: string) => void;
  handleDragEnd: (a: any) => void;
  handleRemoveItem: (index: number, id: number) => void;
}

export default function DndDragDrop({
  options,
  handleDragEnd,
  handleUpdateText,
  handleRemoveItem,
  form,
}: IDndItem) {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div className="">
            <FormLabel>Answers</FormLabel>
            <div
              className={`grid gap-4 ${
                snapshot.isDraggingOver ? "bg-gray-100" : ""
              }`}
              ref={provided.innerRef}
            >
              {options &&
                options.map((item, index) => (
                  <Draggable
                    key={`draggable-id-${item.id.toString()}`}
                    draggableId={`draggable-id-${item.id.toString()}`}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          id={item.id.toLocaleString()}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex w-full space-x-3"
                        >
                          <FormField
                            control={form.control}
                            key={item.id}
                            name={`options.${index}.text`}
                            data-id={item.id}
                            render={({ field }) => (
                              <>
                                <FormItem className="w-full">
                                  <FormControl>
                                    <Input
                                      {...field}
                                      data-id={item.id}
                                      className={
                                        form.formState.errors.title &&
                                        "ring-red-600 bg-red-100"
                                      }
                                      //onChange={field.onChange}
                                      // {...form.register(`stops.${index}.city`)}
                                      // defaultValue={field.name}
                                      // value={field.value.city}
                                      data-value={item.text}
                                      onChange={(e) => {
                                        e.preventDefault();
                                        handleUpdateText(
                                          index,
                                          item,
                                          e.target.value
                                        );
                                        field.onChange(e.target.value);
                                      }}
                                      // onBlur={(e) => field.onBlur(e.target.value)}
                                    />
                                  </FormControl>
                                </FormItem>
                              </>
                            )}
                          />
                          <span className="flex items-center justify-center cursor-move">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 3V9M12 3L9 6M12 3L15 6M12 15V21M12 21L15 18M12 21L9 18M3 12H9M3 12L6 15M3 12L6 9M15 12H21M21 12L18 9M21 12L18 15"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="flex items-center justify-center">
                            <Button
                              type="button"
                              variant="error"
                              size="icon"
                              onClick={(
                                evt: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                evt.preventDefault();
                                handleRemoveItem(index, item.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                fill="currentColor"
                                className="h-6 w-6 fill-current"
                              >
                                <path
                                  fill="currentColor"
                                  d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
                                />
                              </svg>
                            </Button>
                          </span>
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <br />
    </DragDropContext>
  );
}
