import { IData, IOption } from "src/lib/types";

interface IDndResult {
  data: IData[];
  selected: number;
}

export default function DndResult({ data, selected }: IDndResult) {
  const getOptions = (options: IOption[]) => {
    return options.map(({ text }: IOption, k: number) => (
      <li
        className="grid grid-cols-3 gap-4 items-center bg-slate-100"
        key={`li-${k}`}
      >
        <b className="bg-slate-200  p-3">{k}</b>
        <span className="span-2 p-3">{text}</span>
      </li>
    ));
  };
  return (
    <div className="mt-6 lg:mt-8">
      <h1 className="text-xl font-bold text-left mb-3">Form Result</h1>
      <div className="text-left space-y-2 border p-3 lg:p-6 rounded-lg">
        <ul className="space-y-2 px-4">
          <li className="grid grid-cols-3 gap-4 items-center bg-slate-100">
            <b className="bg-slate-200  p-3">ID</b>
            <b className="span-2 p-3">TITLE</b>
          </li>
        </ul>
        {data.map(({ id, title, options }: IData, i: number) => (
          <ul
            key={i}
            className={`space-y-2 p-4 ${selected == id ? "bg-blue-200" : ""}`}
          >
            <li className="grid grid-cols-3 gap-4 items-center bg-slate-100">
              <span className="bg-slate-200  p-3">{id}</span>
              <span className="span-2 p-3">{title}</span>
            </li>
            <li className="bg-slate-50 p-4 space-y-1">
              <ul className="space-y-1">{getOptions(options)}</ul>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
