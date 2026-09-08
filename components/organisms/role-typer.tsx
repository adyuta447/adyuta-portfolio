"use client";

import { useEffect, useState } from "react";

interface RoleTyperProps {
  roles: string[];
}

/**
 * The one interactive fragment of the hero — a typing/deleting cycle through
 * the role list. Split out so the rest of the hero stays a server component.
 */
export function RoleTyper({ roles }: RoleTyperProps) {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  return (
    <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text typing-cursor">
      {displayText}
    </span>
  );
}
