import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";

type Props  = {
  onCreateItem: (title: string) => void;
};

export const CreateItemForm = ({ onCreateItem }: Props ) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    error && setError(null);
  };

  const createItemHandler = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle);
    } else {
      setError("Title is required");
    }
    setTitle("");
  };

  const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && createItemHandler();
  };

  const isButtonDisabled = !title || title.length >= 20;

  return (
    <div>
      <input
        name={"inputTitleField"}
        className={error ? "error" : ""}
        value={title}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <Button
        title="+"
        onClick={createItemHandler}
        disabled={isButtonDisabled}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
