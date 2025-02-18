import { NavLink } from "react-router"

export function NotFound() {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Pagina não existe
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Lamentamos, mas não conseguimos encontrar a página que procura.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <NavLink to={"/"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Voltar
            </NavLink>
            <a href="https://www.linkedin.com/in/gabrielprestesperez/" target="_blank" className="text-sm font-semibold text-gray-900">
            Contate o suporte
            <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    )
}