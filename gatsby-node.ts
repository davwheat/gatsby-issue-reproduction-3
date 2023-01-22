import path from "path";
import readingTime from "reading-time";

const BlogArticlesPerPage = 2;

export const createPages = async (inp) => {
  await createBlogArticles(inp);
};

export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body),
    });
  }
};

/**
 * Create blog article pages.
 */
async function createBlogArticles({ actions, graphql, reporter }) {
  const result = await graphql(`
    query BlogArticles {
      allMdx {
        nodes {
          frontmatter {
            # redirect_from
            path
          }

          internal {
            contentFilePath
          }

          id
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("failed to create posts ", result.errors);
  }
  const pages = result.data.allMdx.nodes;

  pages.forEach((page, i) => {
    const { frontmatter, id, internal } = page;

    actions.createPage({
      path: `/blog/${frontmatter.path}`,
      component:
        path.resolve(`./src/templates/blog-article/BlogPageTemplate.tsx`) +
        `?__contentFilePath=${internal.contentFilePath}`,

      context: { id, page: Math.ceil((i + 1) / BlogArticlesPerPage) },
    });
  });
}
