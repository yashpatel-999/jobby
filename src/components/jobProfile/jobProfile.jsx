import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'
import './jobProfile.css'

const API_STATUS = {
  INITIAL: 'INITIAL',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IN_PROGRESS: 'IN_PROGRESS',
}

const JobProfile = () => {
  const [profile, setProfile] = useState(null)
  const [apiStatus, setApiStatus] = useState(API_STATUS.INITIAL)

  const fetchProfile = async () => {
    setApiStatus(API_STATUS.IN_PROGRESS)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedProfile = {
        name: data.profile_details.name,
        profileImg: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      setProfile(formattedProfile)
      setApiStatus(API_STATUS.SUCCESS)
    } else {
      setApiStatus(API_STATUS.FAILURE)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (apiStatus === API_STATUS.FAILURE) {
    return (
      <div className='failure-btn'>
        <button className="retry-btn" onClick={fetchProfile}>Retry</button>
      </div>
    )
  }
  if (apiStatus === API_STATUS.IN_PROGRESS) {
    return (
      <div className="job-prof">
        <BeatLoader color="#6366f1" size={14} className='failure-btn'/>
      </div>
    )
  }
  if (!profile) {
  return <div>Loading...</div>;
  }


  const {name, profileImg, shortBio} = profile

  return (
    <div className="job-profile">
      <img src={profileImg} alt={`${name}'s profile`} className='avatar'/>
      <h1>{name}</h1>
      <p>{shortBio}</p>
    </div>
  )
}

export default JobProfile