import type { ReactNode } from "react";
import { s } from "../../styles/style";

export function AppShell({
  header,
  footer,
  children,
  className,
}: {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <a href="#main-content" className={s.shell.skipLink}>
        Skip to content
      </a>

      <div className={s.shell.page}>
        {header && (
          <header className={s.shell.headerWrap}>
            <div className={s.shell.headerInner}>{header}</div>
          </header>
        )}

        <main
          id="main-content"
          tabIndex={-1}
          className={`${s.shell.main}${className ? ` ${className}` : ""}`}
        >
          {children}
        </main>

        {footer && (
          <footer className={s.shell.footer}>
            <div className={s.shell.footerInner}>{footer}</div>
          </footer>
        )}
      </div>
    </>
  );
}
