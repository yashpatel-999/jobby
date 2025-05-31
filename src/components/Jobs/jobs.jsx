import Header from '../Header/header';
import JobProfile from '../jobProfile/jobProfile';
import './jobs.css'
import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import JobItemCard from '../JobItemCard/JobItemCard';
import BeatLoader from 'react-spinners/BeatLoader'
import { Link } from 'react-router-dom';

const API_STATUS = {
  INITIAL: 'INITIAL',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IN_PROGRESS: 'IN_PROGRESS',
}
const employmentTypes = [
  { id: "fullTime", label: "Full Time", value: "Full Time" },
  { id: "partTime", label: "Part Time", value: "Part Time" },
  { id: "freelance", label: "Freelance", value: "Freelance" },
  { id: "internship", label: "Internship", value: "Internship" },
];

const salaryRanges = [
  { id: "salary10", label: "10 LPA and above", value: 10 },
  { id: "salary20", label: "20 LPA and above", value: 20 },
  { id: "salary30", label: "30 LPA and above", value: 30 },
  { id: "salary40", label: "40 LPA and above", value: 40 },
];

const JobsPage = () => {
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [apiStatus, setApiStatus] = useState(API_STATUS.INITIAL)
   const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState("");

  const fetchData = useCallback(async () => {
    setApiStatus(API_STATUS.IN_PROGRESS)
    const url = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.jobs.map(job => ({
        id: job.id,
        companyLogo: job.company_logo_url,
        jobTitle: job.title,
        rating: job.rating,
        location: job.location,
        jobType: job.employment_type,
        salary: job.package_per_annum,
        description: job.job_description,
      }));
      setFilteredData(formattedData);
      setApiStatus(API_STATUS.SUCCESS)
    } else {
      setApiStatus(API_STATUS.FAILURE)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onInputChange = (e) => {
    setSearch(e.target.value)
  }
  const onTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes(prev =>
      checked ? [...prev, value] : prev.filter(type => type !== value)
    );
  };
  const onSalaryChange = (e) => setSelectedSalary(e.target.value);
  
  const displayedJobs = filteredData.filter(job => {
    const matchesSearch = job.jobTitle.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(job.jobType);
    const matchesSalary =
      !selectedSalary ||
      parseInt(job.salary) >= parseInt(selectedSalary);
    return matchesSearch && matchesType && matchesSalary;
  });

  return (
    <>
      <Header />
      <div className="jobs-page">
        <div className="side-container">
          <div>
            <JobProfile />
          </div>
          <hr />
          <div className="filters-container">
            <div className="filter-section">
              <h3>Type of Employment</h3>
              <form className="checkbox-form">
                {employmentTypes.map(type => (
                  <div key={type.id}>
                    <input
                      type="checkbox"
                      id={type.id}
                      name="employmentType"
                      value={type.value}
                      checked={selectedTypes.includes(type.value)}
                      onChange={onTypeChange}
                    />
                    <label htmlFor={type.id}>{type.label}</label>
                  </div>
                ))}
              </form>
            </div>
            <hr />
            <div className="filter-section">
              <h3>Salary Range</h3>
              <form className="radio-form">
                {salaryRanges.map(range => (
                  <div key={range.id}>
                    <input
                      type="radio"
                      id={range.id}
                      name="salaryRange"
                      value={range.value}
                      checked={selectedSalary === String(range.value)}
                      onChange={onSalaryChange}
                    />
                    <label htmlFor={range.id}>{range.label}</label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <div className='search-result'>
          <div>
            <input
              type="search"
              placeholder='search'
              className='search-bar'
              value={search}
              onChange={onInputChange}
            />
          </div>
          {renderSearchResultsContent({ apiStatus, displayedJobs, fetchData })}
        </div>
      </div>
    </>
  );
};
function renderSearchResultsContent({ apiStatus, displayedJobs, fetchData }) {
  if (apiStatus === API_STATUS.FAILURE) {
    return (
      <div className='failure-btn'>
        <button className="retry-btn" onClick={fetchData}>Retry</button>
      </div>
    );
  }
  if (apiStatus === API_STATUS.IN_PROGRESS) {
    return (
      <div className="job-prof">
        <BeatLoader color="#6366f1" size={14} className='failure-btn' />
      </div>
    );
  }
  // SUCCESS or INITIAL
  return (
    <div className='filtered-cards'>
      {displayedJobs.length === 0 ? (
        <div>No jobs found.</div>
      ) : (
         displayedJobs.map(job => (
          <Link to={`/jobs/${job.id}`} key={job.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <JobItemCard jobData={job} />
          </Link>
        ))
      )}
    </div>
  );
}
export default JobsPage;