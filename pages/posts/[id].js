import Date from '../../components/date';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import Script from 'next/script'

import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
  }

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
        <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          ```mermaid!
flowchart TD
    A[user request] -.-{'>'} B(Load balancer)
    B -.-{'>'} C(DNS Server)
    C -.-{'>'} D[/email-rest-service.sonam.cloud/]

    subgraph k8[Kubernetes Cluster]
    subgraph ingress[Ingress]
    F(Nginx Controller)
    end

    subgraph app[email-rest-service]
    G(Kubernetes Service)
    G -- uses authId header for user context --{'>'} H(email-rest-service pod)
    H -- validate jwt token using jwt-validator --{'>'} H
    end    
    
    end
    F -. 3 calls-service .-{'>'} G
    B -.-{'>'} k8
    
```

       
        </article>
      </Layout>
    );
  }