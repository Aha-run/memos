import { useColorScheme } from "@mui/joy";
import { useEffect, useRef } from "react";

interface Props {
  content: string;
}

const MermaidBlock: React.FC<Props> = ({ content }: Props) => {
  const mermaidDockBlock = useRef<null>(null);
  const { mode } = useColorScheme();

  const mermaidTheme = mode == "dark" ? "dark" : "default";

  useEffect(() => {
    // Dynamically import mermaid to ensure compatibility with Vite
    const initializeMermaid = async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({ startOnLoad: false, theme: mermaidTheme });
      if (mermaidDockBlock.current) {
        mermaid.run({
          nodes: [mermaidDockBlock.current],
        });
      }
    };

    initializeMermaid();
  }, [content]);

  return (
    <pre ref={mermaidDockBlock} className="w-full p-2 whitespace-pre-wrap relative">
      {content}
    </pre>
  );
};

export default MermaidBlock;
