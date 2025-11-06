"use client";

import { cn } from "../../../../lib/utils";

export type CredentialPreviewProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  data?: Record<string, any>;
  groups?: {
    label: string;
    data: Record<string, any>;
  }[];
  labelMap?: Record<string, string>;
  exclude?: string[];
  className?: string;
};

export function CredentialPreview({
  title = "Credential Preview",
  description,
  icon,
  data = {},
  groups,
  labelMap = {},
  exclude = [],
  className,
}: CredentialPreviewProps) {
  // Transform key/value pairs for display
  const transform = (obj: Record<string, any>) =>
    Object.entries(obj)
      .filter(([key]) => !exclude.includes(key))
      .map(([key, value]) => ({
        label:
          labelMap[key] ||
          key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        value: typeof value === "boolean" ? (value ? "Yes" : "No") : value || "-",
      }));

  const defaultFields = !groups ? transform(data) : [];

  return (
    <div
      className={cn("rounded-xl p-6 flex flex-col gap-4", className)}
      style={{
        background: "var(--moca-surface)",
        borderColor: "var(--moca-border)",
        color: "var(--moca-text)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className="w-8 h-8 flex items-center justify-center rounded-md"
            style={{
              background: "var(--moca-surface-muted)",
              color: "var(--moca-text)",
            }}
          >
            {icon}
          </div>
        )}

        <div className="flex flex-col">
          <span className="font-semibold text-sm">{title}</span>
          {description && (
            <span
              className="text-xs"
              style={{ color: "var(--moca-muted)" }}
            >
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Default (non-grouped) Mode */}
      {!groups && (
        <div className="flex flex-col gap-2 text-sm">
          {defaultFields.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b last:border-none pb-1"
              style={{
                borderColor: "var(--moca-border)",
              }}
            >
              <span style={{ color: "var(--moca-muted)" }}>{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Grouped Mode */}
      {groups && (
        <div className="flex flex-col gap-6 text-sm">
          {groups.map((group, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--moca-muted)" }}
              >
                {group.label}
              </span>

              {transform(group.data).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between "
                  style={{
                    borderColor: "var(--moca-border)",
                  }}
                >
                  <span style={{ color: "var(--moca-muted)" }}>{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
