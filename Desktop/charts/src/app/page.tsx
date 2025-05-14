import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='w-full h-screen flex items-center justify-center gap-5'>
      <Link href="/minimap">View as Minimap</Link>
      <Link href="/flowChart">Flow Chart</Link>
      <Link href="/projectTable">Project Table</Link>
    </div>
  );
}
