import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './jobItemCardFull.css'
import Header from '../Header/header';

const JobItemCardFull = () => {
  const { id } = useParams();
  const [job,setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.ok) {
      const data = await response.json();
      const { job_details, similar_jobs } = data;
      const formattedJob = {
        id: job_details.id,
        companyLogo: job_details.company_logo_url,
        company: job_details.company_website_url,
        title: job_details.title,
        rating: job_details.rating,
        location: job_details.location,
        employmentType: job_details.employment_type,
        salary: job_details.package_per_annum,
        companyWebsite: job_details.company_website_url,
        description: job_details.job_description,
        skills: job_details.skills.map((skill) => ({
          name: skill.name,
          logo: skill.image_url,
        })),
        lifeAtCompany: {
          description: job_details.life_at_company.description,
          imageUrl: job_details.life_at_company.image_url,
        },
        similarJobs: similar_jobs.map((j) => ({
          id: j.id,
          companyLogo: j.company_logo_url,
          company: j.title,
          title: j.title,
          rating: j.rating,
          description: j.job_description,
          location: j.location,
          employmentType: j.employment_type,
        })),
      };
      setJob(formattedJob);
    }
    };
    fetchJobDetails();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <>
    <Header/>
    <div className="job-full-container">
        <div className="main-card">
  <div className="job-full-header">
    <div className="job-full-header-top">
      <img src={job.companyLogo} alt={job.company} className="job-full-company-logo" />
      <div className="job-full-title-box">
        <h2>{job.title}</h2>
        <div className="job-full-rating"><span>★</span> {job.rating}</div>
      </div>
    </div>

    <div className="job-full-subinfo">
      <div className="job-full-info">
        <span>{job.location}</span>
        <span>{job.employmentType}</span>
      </div>
      <div className="job-full-salary">{job.salary}</div>
    </div>
     <hr></hr>
  </div>

  <div className="job-full-section">
    <div className='description-head'>
        <h3>Description</h3>
        <a href={job.companyWebsite} className="job-full-visit-link" target="_blank" rel="noopener noreferrer">
      Visit
    </a>
    </div>
    <p>{job.description}</p>
  </div>

  <div className="job-full-section">
    <h3>Skills</h3>
    <div className="job-full-skills-list">
      {job.skills.map((skill) => (
        <div key={skill.name} className="job-full-skill-item">
          <img src={skill.logo} alt={skill.name} className="job-full-skill-logo" />
          <span>{skill.name}</span>
        </div>
      ))}
    </div>
  </div>

  <div className="job-full-section">
    <h3>Life at Company</h3>
    <div className="job-full-life-content">
      <p>{job.lifeAtCompany.description}</p>
      <img src={job.lifeAtCompany.imageUrl} alt="Life at company" className="job-full-life-image" />
    </div>
  </div>
  </div>

  <div className="job-full-section">
    <h3>Similar Jobs</h3>
    <div className="job-full-similar-jobs-list">
      {job.similarJobs.map((similarJob) => (
        <div key={similarJob.id} className="job-full-similar-job-card">
          <img src={similarJob.companyLogo} alt={similarJob.company} className="job-full-company-logo" />
          <div className="job-full-similar-title-box">
            <h4>{similarJob.title}</h4>
            <div className="job-full-rating"><span>★</span> {similarJob.rating}</div>
          </div>
          <p>{similarJob.description}</p>
          <div className="job-full-info">
            <span>{similarJob.location}</span>
            <span>{similarJob.employmentType}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    </>
  );
};

export default JobItemCardFull;