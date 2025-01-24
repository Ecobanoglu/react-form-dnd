import React, { useCallback, useEffect } from "react";

import { Button } from "@/components/ui";

import DndDragDrop from "@/components/DndDragDrop";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IData, IForm, IOption } from "@/lib/types";

import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * @description Answer schema for form validation
 */
export const iOptionSchema = z.object({
  id: z.number(),
  text: z.string().min(2),
});

/**
 * @description form schema for form validation
 */
export const iFormSchema = z.object({
  title: z.string(),
  options: z.array(iOptionSchema),
});

export default function DndForm({
  allData,
  currentQuestion,
  handleSetData,
  addAnswerItem,
  updateAnswers,
}: IForm) {
  /**
   * @description set current question
   */
  const selectedData: IData = allData.filter(
    (item) => item.id == currentQuestion
  )[0];

  /** Default form values */
  const defaultValues = {
    title: selectedData.title,
    options: selectedData.options,
  };

  /* load question datas into the form */
  const form = useForm<z.infer<typeof iFormSchema>>({
    resolver: zodResolver(iFormSchema),
    defaultValues: defaultValues,
  });

  const { reset } = form;

  /**
   * @description form answers' object form form validation
   */
  const { fields, append, move, update, remove } = useFieldArray({
    name: "options",
    control: form.control,
    keyName: "_id",
  });

  /**
   * @description Form submit function
   */
  const onSubmit = (values: IData) => {
    alert(JSON.stringify(values));
  };

  /**
   * @description set indexes for sorting
   * @param {object} options - Answer list
   */
  /*
  const setIndexesInData = async (options: IOption[]) => {
    let currentOptions = options.map((option: IOption, index: number) => {
      option["id"] = index;
      update(index, { ...option, id: option.id });

      return option;
    });

    return currentOptions;
  };
 */
  /**
   * @description update drag-drop when answer item moved
   * @param {any} result - drag object
   */
  const handleUpdateDrag = async (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let dragData = Array.from(fields);
    const [removed] = dragData.splice(source.index, 1);
    dragData.splice(destination.index, 0, removed);
    move(source.index, destination.index);

    //let currentOptions = (await setIndexesInData(dragData)) as IOption[];

    updateAnswers(selectedData.id!, dragData);
  };

  /**
   * @description changed textinput value when onchange
   * @param {number} id - item index
   * @param {object} item - answer item
   * @param {string} text - textinput value
   */
  const handleUpdateText = useCallback(
    (id: number, item: IOption, text: string) => {
      update(id, { ...item, text: text });

      const updatedFields = fields.map((field) => {
        if (item.id == field.id) {
          field.text = text;
        }
        return field;
      });

      updateAnswers(selectedData.id!, updatedFields);
    },
    [allData]
  );

  /**
   * @description remove answer item in all data and form fields
   * @param {number} index - answer index
   * @param {number} optionId - answer id
   */
  const handleRemoveItem = useCallback(
    async (index: number, optionId: number) => {
      /* Remove form form fields */
      remove(index);

      /* set answer items in fields for sorting */
      const filteredArray = fields.filter(({ id }) => id !== optionId);

      //let currentOptions = (await setIndexesInData(filteredArray)) as IOption[];
      //await setIndexesInData(filteredArray);

      /* Remove from data */
      //removeAnswerItem(optionId, selectedData.id!);
      updateAnswers(selectedData.id!, filteredArray);
    },
    [fields]
  );

  /**
   * @description create answer item and added into the form fields and data
   */
  const createAnswerandAppendAnswer = () => {
    /* Create field id */
    let maxID = 0;
    if (fields.length > 0) {
      maxID = Math.max(...fields.map((o) => o.id));
      maxID++;
    }

    const appenedAnswer = {
      id: maxID,
      text: `Answer ${selectedData.id!}${
        fields.length > 0 ? selectedData.options.length + 1 : 1
      }`,
    };

    append(appenedAnswer);
    addAnswerItem(selectedData.id!, appenedAnswer);
  };

  const handleSetOptionsById = (val: string) => {
    handleSetData(val);
  };
  /**
   * Reset Selected Data and update selected question's data
   */
  useEffect(() => {
    reset(selectedData);
  }, [selectedData]);

  return (
    <div className="text-center">
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-4 md:gap-4 text-left"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Questions</FormLabel>
                  <Select
                    onValueChange={(val: string) => {
                      field.onChange(val);

                      handleSetOptionsById(val);
                    }}
                    defaultValue={selectedData.title}
                  >
                    <FormControl>
                      <SelectTrigger defaultChecked>
                        <SelectValue placeholder="Soru Seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {allData &&
                          allData.map(({ title }: any, k: number) => (
                            <SelectItem
                              defaultChecked={
                                title == selectedData.title ? true : false
                              }
                              key={`selectitem-${k}`}
                              value={title}
                            >
                              {title}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <DndDragDrop
            options={fields}
            form={form}
            handleUpdateText={handleUpdateText}
            handleDragEnd={handleUpdateDrag}
            handleRemoveItem={handleRemoveItem}
          />
          <Button
            type="button"
            variant="gray"
            onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              evt.preventDefault();
              createAnswerandAppendAnswer();
            }}
          >
            Add More
          </Button>

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}
