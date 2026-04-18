"use client";

import { NotebookPen, Paperclip, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useClaimDashboardStore } from "../_utils/store";
import type { TimelineInsertSlot } from "../_utils/types";

interface TimelineInsertComposerProps {
  slot: TimelineInsertSlot;
}

type ComposerMode = "information-note" | "additional-attachment";

export function TimelineInsertComposer({ slot }: TimelineInsertComposerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ComposerMode>("information-note");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const addInformationNote = useClaimDashboardStore(
    (state) => state.addInformationNote,
  );
  const addAdditionalAttachment = useClaimDashboardStore(
    (state) => state.addAdditionalAttachment,
  );

  function resetComposer() {
    setTitle("");
    setNote("");
    setFileName("");
    setDescription("");
    setShowErrors(false);
    setMode("information-note");
    setIsOpen(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowErrors(true);

    if (mode === "information-note") {
      if (!note.trim()) {
        return;
      }

      addInformationNote({
        afterIndex: slot.index,
        title,
        note,
      });
      resetComposer();
      return;
    }

    if (!fileName.trim() || !description.trim()) {
      return;
    }

    addAdditionalAttachment({
      afterIndex: slot.index,
      title,
      fileName,
      description,
    });
    resetComposer();
  }

  const noteInvalid = mode === "information-note" && showErrors && !note.trim();
  const fileNameInvalid =
    mode === "additional-attachment" && showErrors && !fileName.trim();
  const descriptionInvalid =
    mode === "additional-attachment" && showErrors && !description.trim();

  return (
    <Card className="rounded-[1.35rem] border-border/80 border-dashed bg-background/40 shadow-sm">
      {!isOpen ? (
        <>
          <CardHeader className="gap-3">
            <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
              Timeline Updates
            </CardDescription>
            <CardTitle className="font-semibold text-base">
              {slot.label}
            </CardTitle>
            <CardDescription>
              Add a note or attachment to keep the timeline up to date.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(true)}
            >
              <Plus data-icon="inline-start" />
              Add note or attachment
            </Button>
          </CardFooter>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardHeader className="gap-3">
            <CardDescription className="font-semibold text-xs uppercase tracking-[0.24em]">
              Add Timeline Update
            </CardDescription>
            <CardTitle className="font-semibold text-base">
              {slot.label}
            </CardTitle>
            <CardDescription>
              Choose the update type, then capture the context that should
              appear in the timeline after this step.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet>
              <FieldLegend className="sr-only">
                Update type and details
              </FieldLegend>
              <FieldDescription>
                This update stays with the claim so the latest details are easy
                to follow.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Update type</FieldLabel>
                  <ToggleGroup
                    type="single"
                    value={mode}
                    variant="outline"
                    spacing={2}
                    onValueChange={(value) => {
                      if (
                        value === "information-note" ||
                        value === "additional-attachment"
                      ) {
                        setMode(value);
                        setShowErrors(false);
                      }
                    }}
                  >
                    <ToggleGroupItem value="information-note">
                      <NotebookPen data-icon="inline-start" />
                      Information Note
                    </ToggleGroupItem>
                    <ToggleGroupItem value="additional-attachment">
                      <Paperclip data-icon="inline-start" />
                      Additional Attachment
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor={`title-${slot.index}`}>Title</FieldLabel>
                  <Input
                    id={`title-${slot.index}`}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder={
                      mode === "information-note"
                        ? "Information Note"
                        : "Additional Attachment"
                    }
                  />
                  <FieldDescription>
                    Optional. A sensible default label is applied when left
                    blank.
                  </FieldDescription>
                </Field>

                {mode === "additional-attachment" ? (
                  <Field data-invalid={fileNameInvalid || undefined}>
                    <FieldLabel htmlFor={`file-${slot.index}`}>
                      File name
                    </FieldLabel>
                    <Input
                      id={`file-${slot.index}`}
                      value={fileName}
                      aria-invalid={fileNameInvalid || undefined}
                      onChange={(event) => setFileName(event.target.value)}
                      placeholder="repair-report.pdf"
                    />
                    <FieldDescription>
                      Use the name the claimant would recognize in the upload
                      flow.
                    </FieldDescription>
                    {fileNameInvalid ? (
                      <FieldError>
                        Add a file name before inserting the attachment.
                      </FieldError>
                    ) : null}
                  </Field>
                ) : null}

                <Field
                  data-invalid={
                    (mode === "information-note"
                      ? noteInvalid
                      : descriptionInvalid) || undefined
                  }
                >
                  <FieldLabel htmlFor={`body-${slot.index}`}>
                    {mode === "information-note" ? "Note" : "Description"}
                  </FieldLabel>
                  <Textarea
                    id={`body-${slot.index}`}
                    value={mode === "information-note" ? note : description}
                    aria-invalid={
                      (mode === "information-note"
                        ? noteInvalid
                        : descriptionInvalid) || undefined
                    }
                    onChange={(event) =>
                      mode === "information-note"
                        ? setNote(event.target.value)
                        : setDescription(event.target.value)
                    }
                    placeholder={
                      mode === "information-note"
                        ? "Add context that should sit between these claim steps."
                        : "Describe the attachment being inserted into the timeline."
                    }
                    className="min-h-28 resize-y"
                  />
                  <FieldDescription>
                    {mode === "information-note"
                      ? "This note explains context, decisions, or claimant communication."
                      : "This description clarifies why the extra attachment matters to the claim."}
                  </FieldDescription>
                  {mode === "information-note" ? (
                    noteInvalid ? (
                      <FieldError>
                        Add note content before saving this update.
                      </FieldError>
                    ) : null
                  ) : descriptionInvalid ? (
                    <FieldError>
                      Describe the attachment before saving this update.
                    </FieldError>
                  ) : null}
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2">
            <Button type="submit">
              <Plus data-icon="inline-start" />
              Save update
            </Button>
            <Button type="button" variant="ghost" onClick={resetComposer}>
              Cancel
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
