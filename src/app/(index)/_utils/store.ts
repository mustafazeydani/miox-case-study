"use client";

import { create } from "zustand";

import type { AdditionalAttachmentNode, InformationNoteNode } from "./types";

const timestampFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatCreatedAtLabel() {
  return timestampFormatter.format(new Date());
}

interface AddInformationNoteInput {
  afterIndex: number;
  title?: string;
  note: string;
}

interface AddAttachmentInput {
  afterIndex: number;
  title?: string;
  fileName: string;
  description: string;
}

interface ClaimDashboardStoreState {
  insertedNodes: Array<InformationNoteNode | AdditionalAttachmentNode>;
  addInformationNote: (input: AddInformationNoteInput) => void;
  addAdditionalAttachment: (input: AddAttachmentInput) => void;
  removeInsertedNode: (id: string) => void;
}

export const useClaimDashboardStore = create<ClaimDashboardStoreState>(
  (set) => ({
    insertedNodes: [],
    addInformationNote: ({ afterIndex, title, note }) =>
      set((state) => ({
        insertedNodes: [
          ...state.insertedNodes,
          {
            id: crypto.randomUUID(),
            source: "local",
            afterIndex,
            kind: "information-note",
            title: title?.trim() || "Information Note",
            note: note.trim(),
            createdAtLabel: formatCreatedAtLabel(),
          },
        ],
      })),
    addAdditionalAttachment: ({ afterIndex, title, fileName, description }) =>
      set((state) => ({
        insertedNodes: [
          ...state.insertedNodes,
          {
            id: crypto.randomUUID(),
            source: "local",
            afterIndex,
            kind: "additional-attachment",
            title: title?.trim() || "Additional Attachment",
            fileName: fileName.trim(),
            description: description.trim(),
            createdAtLabel: formatCreatedAtLabel(),
          },
        ],
      })),
    removeInsertedNode: (id) =>
      set((state) => ({
        insertedNodes: state.insertedNodes.filter((node) => node.id !== id),
      })),
  }),
);
