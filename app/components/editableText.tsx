//import { useFetcher } from '@remix-run/react';
import { useFetcher } from 'react-router';
import { Check, Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button';

type editButtonPosition = "left" | "right";

interface EditableTextProps {
  value: string;
  inputName: string;
  editButtonPosition?: editButtonPosition;
  actionTarget?: string;
  actionName: string;
  actionValue: string;
  hiddenValues?: { name: string, value: string }[];
  children: ReactNode;
}

export function EditableText({
  value, inputName, editButtonPosition = "right",
  actionTarget, actionName, actionValue, hiddenValues = [],
  children
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  let fetcher = useFetcher<{ error: string }>();

  let isUpdating = fetcher.state !== "idle";
  useEffect(() => {
    if (!isUpdating && !fetcher.data?.error) {
      setEditing(false);
    }
  }, [isUpdating, fetcher.data]);

  return editing ? (
    <fetcher.Form method="post" action={actionTarget ?? ""} className="flex space-x-1 mx-1">
      <Input type="text" name={inputName} defaultValue={value} autoFocus />
      <Button size="icon" disabled={isUpdating} type="submit" name={actionName} value={actionValue}>
        <Check className="h-4 w-4" />
      </Button>
      <Button size="icon" disabled={isUpdating} type="button" onClick={() => setEditing(false)}>
        <X className="h-4 w-4" />
      </Button>
      {hiddenValues.map((hv) => (
        <input key={hv.name} type="hidden" name={hv.name} value={hv.value} />
      ))}
      {fetcher.data?.error ? (
        <p className="text-red-500 text-sm">{fetcher.data.error}</p>
      ) : null}
    </fetcher.Form>
  ) : (
    <div className="flex items-center space-x-1 mx-1">
      {editButtonPosition === "left" ?
        <Button variant="ghost" size="icon" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        : null}
      <div>
        {children}
      </div>
      {editButtonPosition === "right" ?
        <Button variant="ghost" size="icon" onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        : null}
    </div>
  );
}
