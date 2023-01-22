import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

export default function IndexPage(props: PageProps) {
  return (
    <main>
      <h1>Hi</h1>
      <p>Gatsby?</p>
    </main>
  );
}

export const Head: HeadFC = () => <title>Home Page</title>;
