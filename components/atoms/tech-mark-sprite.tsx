import { techMarkId, type TechMark } from "@/lib/tech-stack";

interface TechMarkSpriteProps {
  marks: TechMark[];
}

/**
 * Defines every mark once so the strip can reference them with <use>. Inlining
 * the paths per copy instead would put the same few kilobytes of geometry into
 * the HTML a hundred times over.
 */
export function TechMarkSprite({ marks }: TechMarkSpriteProps) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {marks.map((mark) => (
          <symbol key={mark.id} id={techMarkId(mark.id)} viewBox="0 0 24 24">
            <path d={mark.path} />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
