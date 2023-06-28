import { useState, useEffect } from "react";

function GanttChart() {
  const [tasks, setTasks] = useState(null);
  const [taskDurations, setTaskDurations] = useState(null);
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: "2022",
    toSelectMonth: 1,
    toSelectYear: "2022",
  });
}

export default GanttChart;
