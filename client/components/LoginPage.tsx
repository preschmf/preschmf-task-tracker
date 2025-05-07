import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

const LogInPage = () => {
  const handleLogin = (oAuthProvider: string) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'
    if (!serverUrl) {
      console.error('REACT_APP_SERVER_URL is not defined')
      return
    }
    window.location.href = `${serverUrl}/api/v1/auth/${oAuthProvider}`
  }

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div>
              <img src="/boards.png" alt="Boards" />
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <form className="d-flex flex-column mt-5 w-23">
                <h1 className="fw-light" style={{ color: 'cadetblue' }}>
                  Log In
                </h1>
                <hr className="mt-2 mb-4"></hr>
                <button
                  className="btn btn-lg btn-block btn-primary mb-2"
                  style={{ backgroundColor: 'black', borderColor: 'black' }}
                  type="button"
                  onClick={() => handleLogin('github')}
                >
                  <FontAwesomeIcon icon={faGithub} className="me-2" /> Sign in with GitHub
                </button>
                <button
                  className="btn btn-lg btn-block btn-primary mb-2"
                  style={{ backgroundColor: '#dd4b39', borderColor: '#dd4b39' }}
                  type="button"
                  onClick={() => handleLogin('google')}
                >
                  <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign in with Google
                </button>

                {/* Passport plugin is not maintained, add back in when fixed
                <button
                  className="btn btn-lg btn-block btn-primary mb-2"
                  style={{ backgroundColor: '#3b5998', borderColor: '#3b5998' }}
                  type="button"
                  onClick={() => handleLogin('linkedin')}
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="me-2" /> Sign in with LinkedIn
                </button> */}
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={'/notebook_splash.jpg'}
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: 'cover', objectPosition: 'left' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogInPage
