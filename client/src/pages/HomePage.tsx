import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import type { Note } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const defaultNewNote = {
  showPrompt: false,
  title: "",
  content: "",
};

const HomePage = () => {
  const userEmail = "test@gmail.com";

  const [notes, setNotes] = React.useState<Note[]>([]);
  const [newNote, setNewNote] = React.useState<
    Note & {
      showPrompt: boolean;
    }
  >(defaultNewNote);

  const createNote = () => {
    if (newNote.title.length === 0 || newNote.content.length === 0) return;
    setNotes((notes) => [
      ...notes,
      { title: newNote.title, content: newNote.content },
    ]);

    setNewNote(defaultNewNote);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className=" flex flex-col sm:flex-row sm:gap-3">
          <span className="text-lg sm:text-2xl font-semibold">Welcome,</span>
          <span className="self-end text-primary text-sm">{userEmail}</span>
        </h1>

        {/* Theme Toggle Placeholder */}
        <div id="theme-toggle-placeholder">
          <ModeToggle />
        </div>
      </header>

      {/* Notes Grid */}
      <main className="container mx-auto flex-1 p-4">
        <h1 className="text-3xl md:text-4xl my-6 font-semibold">Notes</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {/* Plus (Create Note) Card */}

          {/* <Card className="aspect-square flex h-auto flex-col">
            <CardContent className="p-4 space-y-2 flex-1">
              <h2 className="text-base font-medium">+</h2>
            </CardContent>
          </Card> */}

          <Dialog
            open={newNote.showPrompt}
            onOpenChange={(open) =>
              setNewNote((prev) => ({ ...prev, showPrompt: open }))
            }
          >
            <DialogTrigger asChild>
              {/* <Card className="flex items-center justify-center border-dashed hover:border-primary hover:text-primary transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-center p-0 h-full w-full text-4xl font-light">
                  <span className="text-3xl font-bold">+</span>
                </CardContent>
              </Card> */}

              <Card className="aspect-square flex flex-col items-center justify-center border-dashed hover:border-primary hover:text-primary transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-center flex-1 p-0 text-4xl font-bold">
                  +
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create a new note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input
                  placeholder="Note title"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <Textarea
                  placeholder="Note content"
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote((prev) => ({ ...prev, content: e.target.value }))
                  }
                />
              </div>
              <DialogFooter>
                <Button onClick={createNote}>Add Note</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Render Notes */}
          {/* {[...Array(9)].map((_, i) => ( */}
          {notes.map((note, i) => (
            <Link key={i} to={`/note/${i}`} className="inline-block h-full ">
              <Card className="flex flex-col h-full">
                <CardContent className="p-4 space-y-2 flex-1">
                  <h2 className="text-base font-medium">{note.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.content}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
