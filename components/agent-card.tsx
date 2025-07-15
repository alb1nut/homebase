"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface AgentProps {
  agent: {
    id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    image: string;
    properties: number;
    experience: number;
    verified: boolean;
  };
}

export function AgentCard({ agent }: AgentProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(`Hi ${agent.name}, I'm interested in getting more information about properties in Ghana.`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, email, phone, message });
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setMessage(`Hi ${agent.name}, I'm interested in getting more information about properties in Ghana.`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex md:flex-col items-center md:items-start gap-4">
        <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-full overflow-hidden">
          <Image 
            src={agent.image} 
            alt={agent.name} 
            fill 
            className="object-cover"
          />
          {agent.verified && (
            <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
              <BadgeCheck className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <div className="flex md:hidden flex-col">
          <div className="flex items-center gap-1">
            <h3 className="font-semibold">{agent.name}</h3>
            {agent.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
          </div>
          <p className="text-sm text-muted-foreground">{agent.title}</p>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="hidden md:block">
          <h3 className="text-lg font-semibold flex items-center gap-1">
            {agent.name}
            {agent.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
          </h3>
          <p className="text-muted-foreground">{agent.title}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:max-w-xs">
          <div className="p-3 bg-muted rounded-lg text-center">
            <p className="text-lg font-semibold">{agent.properties}</p>
            <p className="text-xs text-muted-foreground">Properties</p>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <p className="text-lg font-semibold">{agent.experience} yrs</p>
            <p className="text-xs text-muted-foreground">Experience</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button asChild variant="outline">
            <Link href={`tel:${agent.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Link>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Contact {agent.name}</DialogTitle>
                <DialogDescription>
                  Send a message to inquire about properties or schedule a meeting.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here" 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}