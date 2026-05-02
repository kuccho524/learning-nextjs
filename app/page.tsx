//'use client';
// type Post = {
//   id: number;
//   title: string
// }

import { FormEvent, Suspense } from "react";
import SlowComponent from "./SlowComponent";
import { revalidatePath, revalidateTag, cacheTag } from "next/cache";
import { useRouter } from "next/navigation";

// export default async function Home() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const posts: Post[] = await res.json();

//   return (
//     <div>
//       <h1>記事一覧</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default async function Home() {
//   return (
//     <div>
//       <h1>メインコンテンツ(すぐに表示)</h1>
//       {/* <Suspense fallback={<div>思い込んポーンネントを読み込み中・・・</div>}> */}
//       <SlowComponent />
//       {/* </Suspense> */}
//     </div>
//   );
// }

// export default function Home() {
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = new FormData(e.currentTarget);
//     const name = form.get('name');

//     await fetch('/api/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name }),
//     });
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" />
//       <button type="submit">送信</button>
//     </form>
//   );
// }

async function getHeavyData() {
  'use cache';
  cacheTag('posts');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // revalidatePath('/');
  return '重いデータの取得完了';
}
fetch('hoge.com', {
  next: { tags: ['posts']},
});

revalidateTag('posts', 'max');
const router = useRouter();
router.refresh();

// export default function Home() {
//   const createAction = async (formDate: FormData) => {
//     'use server';
//     const name = formDate.get('name');
//     console.log('ServerActionで実行されました', name)
//   };

//   fetch('hoge.com', { cache: 'no-store'});

//   return (
//     <form action={createAction}>
//       <input type="text" name="name" />
//       <button type="submit">送信</button>
//     </form>
//   );
// }
export default async function Home() {
  const data = await getHeavyData();

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}