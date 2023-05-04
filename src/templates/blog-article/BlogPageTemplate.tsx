import React from "react";

import { graphql, PageProps } from "gatsby";

// import { MDXProvider } from "@mdx-js/react";

// const MdxShortcodes = {
//   img: (props) => <img draggable="false" {...props} loading="lazy" />,
// };

export interface IMdxPageContext {
  frontmatter: {
    /**
     * Blog article title, defined in frontmatter.
     */
    title: string;
    /**
     * Blog article description, defined in frontmatter.
     */
    description: string;
    path: string;
    redirect_from?: string[];
    /**
     * Date article was created at.
     */
    created_at: string;
    /**
     * Date article was updated at.
     */
    updated_at?: string;
    created_at_iso: string;
    updated_at_iso?: string;
    /**
     * Is the post archived (hidden from the article list).
     */
    archived: boolean;
  };

  /**
   * A list of all headings in the document, down to a depth of H3.
   */
  // tableOfContents: { items: TableOfContents };

  /**
   * An estimated time needed to read this article in minutes.
   */
  // fields: {
  //   timeToRead: {
  //     minutes: number;
  //     words: number;
  //   };
  // };
  /**
   * An excerpt from the markdown file, used for SEO.
   */
  excerpt: string;
}

interface IBlogPageTemplateProps extends Omit<PageProps, "children"> {
  pageContext: { id: string; page: number };
  data: { mdx: IMdxPageContext & { page: number } };
  children: React.ReactNode;
}

export default function BlogPageTemplate({
  pageContext,
  location,
  data: { mdx: data },
  children,
}: IBlogPageTemplateProps) {
  const context = data;

  context.frontmatter.updated_at ||= context.frontmatter.created_at;
  context.frontmatter.archived ||= false;

  console.log(children);

  return (
    <section>
      <article id="blog-article">
        <h1>test article</h1>
        <section id="blog-article-content">
          {/* <MDXProvider components={MdxShortcodes}> */}
          {children}
          {/* </MDXProvider> */}
        </section>
      </article>
    </section>
  );
}

export const query = graphql`
  query MdxBlogPost($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        path
        created_at(formatString: "LLL", locale: "en-GB")
        created_at_iso: created_at
      }

      id
      tableOfContents(maxDepth: 3)
      excerpt

      #fields {
      #  timeToRead {
      #    minutes
      #    words
      #  }
      #}
    }
  }
`;
