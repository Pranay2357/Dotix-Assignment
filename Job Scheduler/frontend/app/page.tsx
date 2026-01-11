"use client";
import { useEffect, useState } from "react";

type Job = {
  id: number;
  taskName: string;
  priority: string;
  status: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
    const data = await res.json();
    setJobs(data);
  };

  const runJob = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run-job/${id}`, {
      method: "POST",
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Job Scheduler Dashboard</h1>

      <table className="w-full border rounded">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Task</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-800">
              <td className="p-2 border">{job.id}</td>
              <td className="p-2 border">{job.taskName}</td>
              <td className="p-2 border">{job.priority}</td>
              <td className="p-2 border">{job.status}</td>
              <td className="p-2 border">
                <button
                  onClick={() => runJob(job.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Run
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
