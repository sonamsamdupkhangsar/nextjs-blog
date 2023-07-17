import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
console.log("matterResult: ", matterResult);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  var contentHtml = processedContent.toString()
  

  contentHtml = contentHtml.replace(new RegExp('```mermaid!', 'g'), '<div id="sonam" class="mermaid">')
  contentHtml = contentHtml.replace(new RegExp('```', 'g'), '</div>')
  console.log('html: ', contentHtml);
     
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}

export async function login () {
  try {
    const url = "http://my-server:9001/oauth2/authorize?response_type=code&scope=articles.read%20articles.write&client_id=articles-client&redirect_uri=http://127.0.0.1:8090/login/oauth2/code/articles-client-oidc";

    const res = await fetch (url);
    const data = await res.body;
  }
  catch (err) {
    console.log(err);
  }
}

