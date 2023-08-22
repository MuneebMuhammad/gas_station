import React, {useEffect, useState} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function LineGraph(props) {
  return (
    <div className="container mt-5">
        <LineChart
        className='mt-5'
      width={800}
      height={400}
      data={props.chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
    </div>
  )
}

export default LineGraph