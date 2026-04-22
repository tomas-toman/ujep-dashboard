import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-theme-cream">
      <div className="flex flex-col items-center gap-4">
        <h2 className='text-7xl font-bold'>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className="bg-theme-black text-theme-white py-1 px-3 rounded-xl hover:scale-105 transition-transform">Return Home</Link>
      </div>
    </div>
  )
}