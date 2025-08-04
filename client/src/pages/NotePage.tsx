import React from "react";

import { Copy, X } from "lucide-react";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dummyNote = {
  tags: ["lorem", "ipsum", "dolor"],
  title: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia temporanihil nostrum ex aliquam corporis.
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia temporanihil nostrum ex aliquam corporis.
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia temporanihil nostrum ex aliquam corporis.`,
};

const AiSummaryButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const [open, setOpen] = React.useState(false);
  const [copy, setCopy] = React.useState<"idle" | "copied" | "failed">("idle");

  // generated from sever
  const dummySummary =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aperiam fuga at.";

  const copySummary = () => {
    try {
      navigator.clipboard
        .writeText(dummySummary)
        .then(() => {
          setCopy("copied");
          setTimeout(() => setCopy("idle"), 3000);
        })
        .catch(() => {
          setCopy("failed");
          setTimeout(() => setCopy("idle"), 3000);
        });
    } catch (error) {
      setCopy("failed");
      setTimeout(() => setCopy("idle"), 3000);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
      <AlertDialogTrigger>
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95",
            className,
          )}
          {...props}
        >
          <Sparkles className="h-4 w-4" />
          AI Summary
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center gap-6">
        <h1 className="text-3xl">💥 AI Summary</h1>

        <div className="flex flex-col gap-3">
          <div className="h-[1ch] w-full animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-[1ch] w-full animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-[1ch] w-full animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-[1ch] w-full animate-pulse rounded-full bg-gray-300"></div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={copySummary}
          >
            <Copy />{" "}
            <span>
              {copy === "failed" ? (
                <span className="text-red-500">Couldn't copy</span>
              ) : copy === "copied" ? (
                <span className="text-theme-text/70 text-sm">
                  Copied to clipboard
                </span>
              ) : (
                "Copy Summary"
              )}
            </span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AiTagsButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const acceptTags = () => {
    // TODO
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-orange-500 via-rose-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          {...props}
        >
          <Sparkles className="h-4 w-4" />
          AI Tags
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center gap-6">
        <h1 className="text-3xl">AI Tags</h1>

        <div className="flex flex-wrap gap-3">
          <div className="h-[1lh] w-[15ch] animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-[1lh] w-[15ch] animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-[1lh] w-[15ch] animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-[1lh] w-[15ch] animate-pulse rounded-full bg-gray-300"></div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={acceptTags}
          >
            Accept
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AiImproveButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-emerald-500 via-lime-500 to-yellow-400 px-4 py-2 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95"
      aria-label="AI Assist"
      {...props}
    >
      <Sparkles className="h-5 w-5" />
      AI Improve
    </button>
  );
};

const NotePage = () => {
  const [editing, setEditing] = React.useState(false);
  const [showAiImproved, setShowAiImproved] = React.useState(false);

  const saveNote = () => {
    // TODO
  };

  const removeTag = (tag: string) => {
    // TODO
  };

  const generateAiSummary = () => {
    // TODO
  };

  const aiImprove = () => {
    // TODO
    setShowAiImproved(true);
  };

  const generateAiTags = () => {
    // TODO
  };

  return (
    <div className="container mx-auto my-6 flex flex-col gap-6 p-3 lg:my-12 lg:gap-12">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">
          {editing ? (
            <Input
              className="h-auto text-3xl! leading-10!"
              value={dummyNote.title}
            />
          ) : (
            dummyNote.title
          )}
        </h1>
        <div className="flex gap-3">
          {dummyNote.tags.map((tag, i) => (
            <Badge key={i} variant="default" className="">
              {tag}{" "}
              <X onClick={() => removeTag(tag)} className="cursor-pointer" />
            </Badge>
          ))}
        </div>
        {!editing && (
          <div className="flex flex-wrap items-center gap-3">
            <AiSummaryButton onClick={generateAiSummary} />
            <AiImproveButton onClick={aiImprove} />
            <AiTagsButton onClick={generateAiTags} />
          </div>
        )}
      </div>

      {/* AI improve content */}
      {showAiImproved && (
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl lg:text-4xl">
              Improved by AI ✨
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente adipisci, unde explicabo incidunt at harum inventore
                architecto voluptates, ex accusamus aperiam delectus, nobis eum.
              </p>
              <div className="h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAiImproved(false)}
              >
                Cancel
              </Button>
              <Button>Accept</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      <div className="flex flex-col gap-1.5 lg:gap-3">
        {editing ? (
          <Textarea className="text-lg!" value={dummyNote.content} />
        ) : (
          dummyNote.content.split("\n").map((line, i) => (
            <p className="text-lg" key={i}>
              {line}
            </p>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 lg:gap-6">
        {editing ? (
          <>
            <Button
              onClick={() => setEditing(false)}
              className="cursor-pointer"
              variant="default"
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => saveNote()}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Dialog>
              <DialogTrigger>
                <Button className="cursor-pointer" variant="destructive">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete the note?
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Continue</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NotePage;
