import React from 'react';
import './home.css';
import Header from '../Header/header';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <Header/>
    <div className="home-hero">
      <div className="home-content">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
        <button className="find-jobs-button">Find Jobs</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Home;
