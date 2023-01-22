import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

export default function IndexPage(props: PageProps) {
  return (
    <main>
      <h1>404</h1>
      <p>aaaaaaa</p>
    </main>
  );
}

export const Head: HeadFC = () => <title>Error 404</title>;
