import { React, useState, useEffect } from 'react';

const Pagination = ({ data, RenderComponent, title, pageLimit, dataLimit }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
      }, [currentPage]);

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

    // The start index is calculated using the currentPage and dataLimit and the end index is calculated by 
    // adding the start index and the dataLimit.
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

/*################
- data: An array of data that should be shown in the paginated form
- RenderComponent: A component that should be used to show the paginated data. In our case, 
this will the the Post component that we created earlier.
- title: This is the title that should describe what the data is about. In our case, it will be the Posts
- dataLimit: The number of posts to be shown on each page. In our case, it will be 10.
- pageLimit: The number of pages to be shown in the pagination. In our case, it will be 5 pages at a time.
###################*/