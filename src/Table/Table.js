import "./Table.css";

export const Table = ({ data }) => {
  return (
    <table className="Table">
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, i) => {
            return <th key={i}>{key}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => {
          return (
            <tr key={i}>
              {Object.values(item).map((value, i) => {
                return <td key={i}>{value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
