import { Route, Routes } from "react-router";

import SearchCep from "./layouts/consulta-cep";
import { DefaultLayout } from "./layouts/defaultlayout";
import SearchCnpj from "./layouts/consulta-cnpj";
import SearchIbge from "./layouts/consulta-ibge";
import NationalHolidays from "./layouts/feriados-nacionais";
import ConsultaDdd from "./layouts/consulta-ddd";
import { NotFound } from "./layouts/not-found";
import { DefaultPage } from "./layouts/default-page";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<DefaultPage />} />
                <Route path="/consulta-cep" element={<SearchCep />} />
                <Route path="/consulta-cnpj" element={<SearchCnpj />} />
                <Route path="/consulta-ibge" element={<SearchIbge />} />
                <Route path="/feriados-nacionais" element={<NationalHolidays />} />
                <Route path="/consulta-ddd" element={<ConsultaDdd />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}