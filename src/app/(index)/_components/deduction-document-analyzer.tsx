"use client";

import {
  AlertTriangle,
  BadgeCheck,
  CircleX,
  FileSearch,
  LoaderCircle,
} from "lucide-react";
import { startTransition, useId, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { simulateDocumentAnalysis } from "../_utils/ai";
import type { DocumentAnalysisResult } from "../_utils/types";

interface DeductionDocumentAnalyzerProps {
  requestLabel: string;
}

function getAnalysisPresentation(result: DocumentAnalysisResult) {
  switch (result.state) {
    case "accepted":
      return {
        icon: BadgeCheck,
        className:
          "border-emerald-200/80 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100",
      };
    case "warning":
      return {
        icon: AlertTriangle,
        className:
          "border-amber-200/80 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100",
      };
    case "rejected":
      return {
        icon: CircleX,
        className:
          "border-destructive/20 bg-destructive/6 text-destructive dark:border-destructive/30 dark:bg-destructive/10",
      };
    default:
      return {
        icon: FileSearch,
        className: "border-border/70 bg-background/70 text-foreground",
      };
  }
}

export function DeductionDocumentAnalyzer({
  requestLabel,
}: DeductionDocumentAnalyzerProps) {
  const inputId = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<DocumentAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const presentation = analysisResult
    ? getAnalysisPresentation(analysisResult)
    : null;

  async function handleAnalyze() {
    if (!selectedFile) {
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    const result = await simulateDocumentAnalysis(selectedFile);
    startTransition(() => {
      setAnalysisResult(result);
      setIsAnalyzing(false);
    });
  }

  return (
    <Card
      size="sm"
      className="rounded-[1.25rem] border border-primary/12 bg-primary/4"
    >
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full">
            Simulated document AI
          </Badge>
          <CardDescription>{requestLabel}</CardDescription>
        </div>
        <CardTitle className="font-semibold text-xl leading-tight">
          Occupational certificate analyzer
        </CardTitle>
        <CardDescription>
          This local analyzer checks a selected file name and extension to mimic
          how an assistive AI tool might pre-screen the upload before a claims
          handler reviews it.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <FieldSet>
          <FieldLegend className="sr-only">
            Occupational certificate upload
          </FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={inputId}>Certificate file</FieldLabel>
              <Input
                id={inputId}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                onChange={(event) => {
                  const nextFile = event.target.files?.[0] ?? null;
                  setSelectedFile(nextFile);
                  setAnalysisResult(null);
                }}
              />
              <FieldDescription>
                Accepted for the simulation: PDF, PNG, JPG, JPEG, WEBP.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        {selectedFile ? (
          <Badge
            variant="secondary"
            className="h-auto w-fit rounded-full px-3 py-1"
          >
            Selected: {selectedFile.name}
          </Badge>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={!selectedFile || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? (
              <LoaderCircle className="animate-spin" data-icon="inline-start" />
            ) : (
              <FileSearch data-icon="inline-start" />
            )}
            {isAnalyzing ? "Analyzing..." : "Run simulated analysis"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={!selectedFile && !analysisResult}
            onClick={() => {
              setSelectedFile(null);
              setAnalysisResult(null);
              setIsAnalyzing(false);
            }}
          >
            Reset
          </Button>
        </div>

        {presentation && analysisResult ? (
          <Alert className={presentation.className}>
            <presentation.icon />
            <AlertTitle>{analysisResult.title}</AlertTitle>
            <AlertDescription>
              <p>{analysisResult.summary}</p>
              <ul className="mt-3 flex list-disc flex-col gap-1 pl-4">
                {analysisResult.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}
