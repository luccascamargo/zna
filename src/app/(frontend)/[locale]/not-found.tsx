import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center gap-6">
      <p className="text-[#969696] text-sm">404</p>
      <h1
        className="text-[#202246] text-[60px] leading-[1em]"
        style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 200 }}
      >
        Página não encontrada
      </h1>
      <Link
        href="/"
        className="flex items-center gap-2.5 bg-[#202246] text-white px-[30px] py-[15px] rounded-[15px] text-base"
        style={{ fontFamily: "'Lufga', sans-serif" }}
      >
        Voltar para o início
      </Link>
    </div>
  )
}
