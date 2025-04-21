const PER_PAGE_LIMIT=15
const PaginationComponent=({
    pagination={
       
      currentPage:1,
        totalPages:5
    },
    fetchCall,
}:{pagination:{currentPage:number ,totalPages:number }, fetchCall:Function})=>{
  
    return (<>
   <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
              <ol className="flex justify-end gap-1 text-xs font-medium">
                {
                  pagination.currentPage === 1 ? <></> : <>


                    <li>
                      <a
                        href="#"
                        onClick={(e)=>{
                          e.preventDefault()
                          fetchCall({ page: (pagination.currentPage-1), limit: PER_PAGE_LIMIT })
                        }}
                        className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                      >
                        <span className="sr-only">Prev Page</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>


            

                  </>
                }




                {
                  [...Array(pagination.totalPages)].map((item: any, index: number) => (
                    <li key={index}>
                      <a
                        href="#"
                        onClick={(e)=>{e.preventDefault()
                        fetchCall({ page: index+1, limit: PER_PAGE_LIMIT })
                        }}
                        className={`block size-8  rounded border ${(index+1)===pagination.currentPage? 'border-green-100 bg-green-700  text-white' :'border-gray-100 bg-white'}  text-center leading-8 text-gray-900`}
                      >
                        {index + 1}
                      </a>

                    </li>
                  ))
                }



              { 
                (pagination.totalPages!== pagination.currentPage )?<>
                <li>
                  <a
                    href="#"
                    onClick={(e)=>{
                      e.preventDefault()
                      fetchCall({ page: (pagination.currentPage+1), limit: PER_PAGE_LIMIT })
                    }}

                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                  >
                    <span className="sr-only">Next Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                </>:
                
                <>
               </>}
               <>

               </>
               
                
              </ol>
            </div>

    </>)
}

export default PaginationComponent