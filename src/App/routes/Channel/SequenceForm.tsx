import React, { useRef } from "react";

import { style } from "../../style";

interface SequenceFormProps {
  readonly sequence?: number;
  readonly setSequence: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function SequenceForm({ sequence, setSequence }: SequenceFormProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSequenceInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const sequenceString = event.target.value;
    if (!sequenceString) {
      event.target.value = "";
      return;
    }

    const sequenceNumber = Number.parseInt(sequenceString, 10);
    const validNumber = !isNaN(sequenceNumber) && sequenceNumber > 0;
    const newSequence = validNumber ? sequenceNumber : sequence;
    event.target.value = newSequence ? newSequence.toString() : "";
  }

  return (
    <form>
      <label htmlFor="sequence" className="text-lg font-bold">
        Sequence for unreceived:
      </label>
      <input
        type="number"
        name="sequence"
        ref={inputRef}
        onChange={handleSequenceInput}
        className={style.input}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          const sequence = Number(inputRef.current?.value) || undefined;
          setSequence(sequence);
        }}
        className={`${style.button} ml-2`}
      >
        Submit
      </button>
    </form>
  );
}
