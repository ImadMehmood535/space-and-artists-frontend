import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';

function Table({ columns, data, gotoPage, pageCount, previousPage, nextPage, canPreviousPage, canNextPage, defaultPageSize = 5 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        pageCount,
        canPreviousPage,
        canNextPage,
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className='r-table table table-dark table-striped'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.isSorted ? (column.isSortedDesc ? 'sorted-desc p-3' : 'sorted-asc p-3') : ' p-3'}
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    id={cell.id}
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <nav aria-label='Page navigation example'>
        <div className='pagination'>
          <button onClick={() => gotoPage(0)} className={`page-link ${!canPreviousPage ? 'disabled' : ''}`} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} className={`page-link ${!canPreviousPage ? 'disabled' : ''}`} disabled={!canPreviousPage}>
            {'<'}
          </button>
          <button onClick={() => nextPage()} className={`page-link ${!canNextPage ? 'disabled' : ''}`} disabled={!canNextPage}>
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} className={`page-link ${!canNextPage ? 'disabled' : ''}`} disabled={!canNextPage}>
            {'>>'}
          </button>
        </div>
      </nav>
    </>
  );
}

export const ReactTableWithPaginationCard = (props) => {
  const cols = React.useMemo(() => props.cols, []);

  return (
    <Card className='mb-4'>
      <CardBody>
        <Table columns={cols} data={props.data} />
      </CardBody>
    </Card>
  );
};

export const ReactTable = (props) => {
  const cols = React.useMemo(() => props.cols, []);
  return (
    <div className='mb-4 table-responsive'>
      <Table
        columns={cols}
        nextPage={props.nextPage}
        gotoPage={props.gotoPage}
        getPageData={props.getPageData}
        pageCount={props.pageCount}
        previousPage={props.previousPage}
        canPreviousPage={props.canPreviousPage}
        canNextPage={props.canNextPage}
        data={props.data}
        divided
        defaultPageSize={props.defaultPageSize}
      />
    </div>
  );
};
