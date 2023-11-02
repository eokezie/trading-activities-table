import React, { useState } from "react";
import "./TableComponent.scss";

interface TradingActivity {
  _id: string;
  symbolCode: string;
  open: number;
  high: number;
  highQty: number;
  low: number;
  lowQty: number;
  deal: number;
  totalQty: number;
  totalValue: number;
  close: number;
  percentChange: number;
  dateCreated: string;
}

interface Props {
  tradingActivities: TradingActivity[];
}

const TableComponent: React.FC<Props> = ({ tradingActivities }) => {
  const [expandedDates, setExpandedDates] = useState<string[]>([]);
  const groupByDate = () => {
    const groupedData: { [date: string]: TradingActivity[] } = {};

    tradingActivities.forEach((activity) => {
      if (!groupedData[activity.dateCreated]) {
        groupedData[activity.dateCreated] = [];
      }

      groupedData[activity.dateCreated].push(activity);
    });

    return groupedData;
  };

  const groupedData = groupByDate();

  const firstDateKey = Object.keys(groupedData)[0]; // Get the first date key

  const toggleExpand = (dateCreated: string) => {
    if (expandedDates.includes(dateCreated)) {
      setExpandedDates(expandedDates.filter((date) => date !== dateCreated));
    } else {
      setExpandedDates([...expandedDates, dateCreated]);
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Symbol Code</th>
            <th>Open</th>
            <th>High</th>
            <th>High Qty</th>
            <th>Low</th>
            <th>Low Qty</th>
            <th>Deals</th>
            <th>Total Qty</th>
            <th>Total Value</th>
            <th>Close</th>
            <th>Percentage Change</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((dateCreated, index) => (
            <React.Fragment key={dateCreated}>
              {groupedData[dateCreated]
                .slice(0, expandedDates.includes(dateCreated) ? undefined : 2)
                .map((activity) => (
                  <tr key={activity._id}>
                    <td>{activity.symbolCode}</td>
                    <td>{activity.open}</td>
                    <td>{activity.high}</td>
                    <td>{activity.highQty}</td>
                    <td>{activity.low}</td>
                    <td>{activity.lowQty}</td>
                    <td>{activity.deal}</td>
                    <td>{activity.totalQty}</td>
                    <td>{activity.totalValue}</td>
                    <td>{activity.close}</td>
                    <td>{activity.percentChange}</td>
                    <td>{activity.dateCreated}</td>
                  </tr>
                ))}
              {groupedData[dateCreated].length > 2 && (
                <tr>
                  <td colSpan={12}>
                    <button onClick={() => toggleExpand(dateCreated)}>
                      {expandedDates.includes(dateCreated)
                        ? "Show Less"
                        : "Show More"}
                    </button>
                  </td>
                </tr>
              )}
              {index < Object.keys(groupedData).length - 1 && (
                <tr>
                  <td colSpan={12}>
                    <hr />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

// import React, { useState } from "react";
// import "./TableComponent.scss";

// interface TradingActivity {
//   _id: string;
//   symbolCode: string;
//   open: number;
//   high: number;
//   highQty: number;
//   low: number;
//   lowQty: number;
//   deal: number;
//   totalQty: number;
//   totalValue: number;
//   close: number;
//   percentChange: number;
//   dateCreated: string;
// }

// interface Props {
//   tradingActivities: TradingActivity[];
// }

// const TableComponent: React.FC<Props> = ({ tradingActivities }) => {
//   const [showAll, setShowAll] = useState(false);

//   const groupByDate = () => {
//     const groupedData: { [date: string]: TradingActivity[] } = {};

//     tradingActivities.forEach((activity) => {
//       if (!groupedData[activity.dateCreated]) {
//         groupedData[activity.dateCreated] = [];
//       }

//       groupedData[activity.dateCreated].push(activity);
//     });

//     return groupedData;
//   };

//   const groupedData = groupByDate();

//   return (
//     <div className="table-container">
//       {Object.keys(groupedData).map((dateCreated, index) => (
//         <div key={dateCreated}>
//           <h3>{dateCreated}</h3>
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Symbol Code</th>
//                 <th>Open</th>
//                 <th>High</th>
//                 <th>High Qty</th>
//                 <th>Low</th>
//                 <th>Low Qty</th>
//                 <th>Deals</th>
//                 <th>Total Qty</th>
//                 <th>Total Value</th>
//                 <th>Close</th>
//                 <th>Percentage Change</th>
//                 <th>Date Created</th>
//               </tr>
//             </thead>
//             <tbody>
//               {groupedData[dateCreated]
//                 .slice(0, showAll ? undefined : 2)
//                 .map((activity) => (
//                   <tr key={activity._id}>
//                     <td>{activity.symbolCode}</td>
//                     <td>{activity.open}</td>
//                     <td>{activity.high}</td>
//                     <td>{activity.highQty}</td>
//                     <td>{activity.low}</td>
//                     <td>{activity.lowQty}</td>
//                     <td>{activity.deal}</td>
//                     <td>{activity.totalQty}</td>
//                     <td>{activity.totalValue}</td>
//                     <td>{activity.close}</td>
//                     <td>{activity.percentChange}</td>
//                     <td>{activity.dateCreated}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//           {groupedData[dateCreated].length > 2 && (
//             <button onClick={() => setShowAll(!showAll)}>
//               {showAll ? "Show Less" : "Show More"}
//             </button>
//           )}
//           {index < Object.keys(groupedData).length - 1 && <hr />}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TableComponent;
