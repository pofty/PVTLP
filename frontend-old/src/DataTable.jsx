export default function DataTable({data}) {
    return (
        <table className=" table-auto table-bordered border-black">
            <caption className="caption-top">
                top caption
            </caption>
            <thead>

            <tr className=" bg-black text-amber-50 ">
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
            </tr>
            </thead>
            <tbody>
            <h1>DataTable</h1>
            <tr>
                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td>Malcolm Lockyer</td>
                <td>1961</td>
            </tr>
            <tr>
                <td>Witchy Woman</td>
                <td>The Eagles</td>
                <td>1972</td>
            </tr>
            <tr>
                <td>Shining Star</td>
                <td>Earth, Wind, and Fire</td>
                <td>1975</td>
            </tr>
            </tbody>
        </table>
    )
}