import { useCallback, useState, useEffect } from "react";

import "./App.css";

import DndForm from "./components/DndForm";
import DndResult from "./components/DndResult";
import { IData, IOption } from "@/lib/types";
import { allData } from "@/lib/data";

function App() {
  /**
    @description  All Questions 
  */
  const [data, setData] = useState<IData[]>(allData);

  /**
    @description Selected question
  */
  const [selectedId, setSelectedId] = useState<number>(0);

  /**
    @description Adding new answer item into the question 
    @param       {string} questionID - current question id
    @param       {object} answer - object to be inserted
  */
  const addAnswerItem = useCallback(
    (questionID: number, answer: IOption) => {
      let currentData = data.map((item) => {
        if (item.id == questionID) {
          item.options.push(answer);
        }
        return item;
      });
      setData(currentData);
    },
    [data]
  );

  /**
    @description remove answer item from the question 
    @param       {number} answerID - answer id
    @param       {number} questionID - current question id
  */
  const removeAnswerItem = useCallback(
    (answerID: number, questionID: number) => {
      const newData: IData[] = data.map((question) => {
        if (question.id == questionID) {
          return {
            ...question,
            options: question.options.filter(
              (option) => option.id !== answerID
            ),
          };
        } else {
          return question;
        }
      });

      setData(newData);
    },
    [data]
  );

  /**
   * @description Update answers in current Question
   * @param {number} questionID - current question id
   * @param {object} options - all answers
   */
  const updateQuestion = useCallback(
    (questionID: number, options: IOption[]) => {
      let newData = data;
      let updatedData = newData.map((item) => {
        if (item.id == questionID) {
          item["options"] = [];
          item["options"] = options;
        }

        return item;
      });

      setData(updatedData);
    },
    [data]
  );

  /**
    @description set select current question  by "title"
    @param       {string} selectedTitle - selected question title
  */
  const setSelectQuestion = (selectedTitle: string) => {
    const filteredData = data.filter(
      ({ title }) => title == selectedTitle
    )[0] as IData;
    setSelectedId(filteredData.id!);
  };
  /**  When data changes */
  useEffect(() => {}, [data]);

  return (
    <>
      <div className="px-4 mx-auto max-w-screen-md">
        <DndForm
          allData={data}
          addAnswerItem={addAnswerItem}
          currentQuestion={selectedId}
          handleSetData={setSelectQuestion}
          updateAnswers={updateQuestion}
          removeAnswerItem={removeAnswerItem}
        />

        <DndResult data={data} selected={selectedId} />
      </div>
    </>
  );
}

export default App;
