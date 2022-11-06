import { React, useState } from 'react';

const Pagination = ({ data, RenderComponent, title, pageLimit, dataLimit }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    const goToNextPage = () => {
        return setCurrentPage((page) => page + 1);
    };

    const goToPrevPage = () => {
        return setCurrentPage((page) => page - 1);
    };

    /* The changePage function will be called when the user clicks on any page number and it will change the current page
        to the page number that was clicked by the user.*/
    const changePage = (evnt) => {
        const pageNumber = Number(evnt.target.textContent);
        return setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map(
            (_, idx) => {
                return start + idx + 1
            }
        );
    };

    return (
        <div>
            <h1>{title}</h1>

            {/* show the posts, 10 posts at a time */}
            <div className="dataContainer">
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent
                        key={idx}
                        // data={d} 
                        id={d.id}
                        title={d.title}
                        body={d.body}
                    />
                ))}
            </div>

            {/* show the pagination
            it consists of next and previous buttons
            along with page numbers, in our case, 5 page
            numbers at a time
        */}
            <div className='pagination'>
                {/* previous button */}
                <button
                    onClick={goToPrevPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    );
};

export default Pagination;