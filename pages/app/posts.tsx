import { GetStaticProps } from 'next';
import Link from 'next/link';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface Props {
    posts: Post[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();

    return {
        props: {
            posts,
        },
    };
};

const PostsPage: React.FC<Props> = ({ posts }) => {
    return (
        <div>
            <h1>Posts </h1>
            <ul>
                {
                    posts.map((post) => (
                        <li key={post.id} >
                            <Link href={`/app/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default PostsPage;
