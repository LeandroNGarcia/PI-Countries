import React, { Suspense } from 'react'
import { useDispatch, useSelector } from "react-redux"
import SkeletonCountry from "../skeletons/SkeletonCountry"
import { setPage } from '../../redux/actions/actions';
import "./Countries.css"

const Countries = ({ navigate }) => {
    const countries = useSelector((state) => state.countries.countries);
    const page = useSelector((state) => state.values.page);
    const dispatch = useDispatch()
    const itemsPage = 10;
    const indexOfLastItem = page * itemsPage;
    const indexOfFirstItem = indexOfLastItem - itemsPage;
    const currentCountriesDisplay = countries.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(countries.length / itemsPage);
    const maxPagesToShow = 5;

    let startPage, endPage;
    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
        if (page <= halfMaxPagesToShow) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (page + halfMaxPagesToShow >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = page - halfMaxPagesToShow;
            endPage = page + halfMaxPagesToShow;
        }
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const Country = React.lazy(()=>{
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(import("./Country"))
            },220)
        })
    })

    return (
        <>
            <div className='Countries'>
                {countries.length ? currentCountriesDisplay.map((c) => (
                    <Suspense key={c.id} fallback={<SkeletonCountry/>}>
                        <Country key={c.id} c={c} navigate={navigate} />
                    </Suspense>
                )) :
                    <span style={{
                        fontSize:"3em",
                        textShadow:"1px 1px 2px black",
                        color:"white",
                    }}>No hay paises con ese nombre</span>}
            </div>
            <div className='Pagination'>
                <button onClick={() => dispatch(setPage(1))} disabled={page === 1} title='First Page' >
                    <span class="material-icons">
                        first_page
                    </span>
                </button>
                <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1} title='Prev Page'>
                    <span class="material-icons">
                        chevron_left
                    </span>
                </button>
                {pageNumbers.map((number) => (
                    <button key={number} id='num-pag' onClick={() => dispatch(setPage(number))} className={number === page ? 'active' : ''}>
                        {number}
                    </button>
                ))}
                <button onClick={() => dispatch(setPage(page + 1))} disabled={page === totalPages} title='Next Page'>
                    <span class="material-icons">
                        chevron_right
                    </span>
                </button>
                <button onClick={() => dispatch(setPage(totalPages))} disabled={page === totalPages} title='Last Page' >
                    <span class="material-icons">
                        last_page
                    </span>
                </button>
            </div>
        </>
    )
}

export default Countries