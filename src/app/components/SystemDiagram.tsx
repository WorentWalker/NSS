import { Fragment, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type DiagramNode = {
  label: string;
  icon: ReactNode;
  color: string;
};

type SystemDiagramProps = {
  nodes: DiagramNode[];
};

export function SystemDiagram({ nodes }: SystemDiagramProps) {
  const template = nodes
    .map((_, i) => (i < nodes.length - 1 ? "72px 24px" : "72px"))
    .join(" ");

  return (
    <div
      className="system-diagram"
      style={{ gridTemplateColumns: template }}
    >
      {nodes.map((node, i) => (
        <Fragment key={node.label}>
          <div
            className="system-diagram__icon-cell"
            style={{ gridColumn: i * 2 + 1, gridRow: 1 }}
          >
            <div
              className="system-diagram__icon"
              style={{
                backgroundColor: `${node.color}18`,
                border: `1px solid ${node.color}55`,
                color: node.color,
                boxShadow: `0 4px 12px ${node.color}15`,
              }}
            >
              {node.icon}
            </div>
          </div>
          {i < nodes.length - 1 && (
            <div
              className="system-diagram__arrow-cell"
              style={{ gridColumn: i * 2 + 2, gridRow: 1 }}
              aria-hidden
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </div>
          )}
          <div
            className="system-diagram__label-cell"
            style={{ gridColumn: i * 2 + 1, gridRow: 2 }}
          >
            {node.label}
          </div>
        </Fragment>
      ))}

      <style>{`
        .system-diagram {
          display: grid;
          row-gap: 10px;
          justify-content: center;
          margin: 32px auto;
          max-width: 100%;
          overflow-x: auto;
          padding: 4px 8px 8px;
          -webkit-overflow-scrolling: touch;
        }
        .system-diagram__icon-cell {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .system-diagram__icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .system-diagram__arrow-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          color: #2DC653;
        }
        .system-diagram__label-cell {
          color: #64748B;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
          line-height: 1.35;
          min-height: 30px;
          padding: 0 2px;
        }
      `}</style>
    </div>
  );
}
