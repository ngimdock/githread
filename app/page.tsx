"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="m-4 space-y-4">
      <Button
        variant="default"
        onClick={() => console.log({ message: "Hello world !" })}
      >
        Click me
      </Button>

      <Input placeholder="Your name" />

      <Textarea placeholder="Placeholder" />
    </div>
  );
}
