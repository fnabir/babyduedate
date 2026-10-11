import { METHODS } from "@/libs/methods";
import { selectMethod, setMethod } from "@/store/calculatorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function MethodSelection() {
  const dispatch = useAppDispatch();
  const method = useAppSelector(selectMethod);

  return (
    <fieldset className="mb-5">
      <legend className="font-display text-[1rem] font-semibold">
        Count based on
      </legend>
      <div className="grid gap-1 rounded-xl border border-line bg-canvas p-1 grid-cols-3">
        {METHODS.map((m) => (
          <label
            key={m.id}
            className="cursor-pointer rounded-lg px-2 py-2.5 text-center content-center font-display text-sm font-semibold text-muted transition-colors has-checked:bg-ink has-checked:text-canvas has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
          >
            <input
              type="radio"
              name="method"
              value={m.id}
              checked={method === m.id}
              onChange={() => dispatch(setMethod(m.id))}
              className="sr-only"
            />
            {m.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
