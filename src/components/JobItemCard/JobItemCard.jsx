import './JobItemCard.css'

const JobItemCard = (props) => {
  const {jobData} = props
  const {companyLogo,jobTitle,rating,location,jobType,salary,description} = jobData;

  return (
    <div className="job-card">
      <div className="job-header">
        <img
          src={companyLogo}
          alt={`${jobTitle} company logo`}
          className="company-logo"
        />
        <div className="job-title-rating">
          <h2 className="job-title">{jobTitle}</h2>
          <div className="rating">
            <span className="star">★</span>
            <span>{rating}</span>
          </div>
        </div>
      </div>
      <div className="job-details">
        <div className="job-info">
          <span className="location">📍 {location}</span>
          <span className="job-type">💼 {jobType}</span>
        </div>
        <div className="salary">{salary}</div>
      </div>
      <hr className="divider" />
      <div className="job-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default JobItemCard;