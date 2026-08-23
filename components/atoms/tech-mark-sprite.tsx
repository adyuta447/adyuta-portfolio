import { techMarkId, type TechMark } from "@/lib/tech-stack";

interface TechMarkSpriteProps {
  marks: TechMark[];
}

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
