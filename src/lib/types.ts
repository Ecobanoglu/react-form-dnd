export interface IOption {
  id: number;
  text: string;
  _id?: string;
}

export interface IData {
  id?: number;
  title: string;
  options: IOption[];
}

export interface IForm {
  allData: IData[];
  currentQuestion: number;
  handleSetData: (a: string) => void;
  updateAnswers: (a: number, b: IOption[]) => void;
  addAnswerItem: (a: number, b: IOption) => void;
  removeAnswerItem: (a: number, b: number) => void;
}
