const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {Array.from({ length: 8 }).map((_, idx) => (
              <th key={idx}>
                <div className="skeleton h-6 w-24"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: 8 }).map((_, colIdx) => (
                <td key={colIdx}>
                  <div className="skeleton h-6 w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
