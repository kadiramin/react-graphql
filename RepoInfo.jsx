import * as React from "react";


function RepoInfo({ repo }) {
  let license;

// Extracting spdxID once to avoid repetition
  const spdxID = repo?.licenseInfo?.spdxID;



// Switch block to set the correct license button
  const licenseButton = (bgColor, text) => (
      <span
          style={{
            padding: '0.25rem 0.5rem',
            marginLeft: '0.25rem',
            display: 'inline-block',
            backgroundColor: bgColor,
            color: 'white',
            fontSize: '.6rem',
            borderRadius: '0.25rem',
            textAlign: 'center',
          }}
      >
    <i>{text}</i>
  </span>
  );

// Inside the switch:
  switch (spdxID) {
    case undefined:
      license = licenseButton('#dc3545', 'NO LICENSE'); // Red color
      break;

    case 'NOASSERTION':
      license = licenseButton('#ffc107', spdxID); // Yellow color
      break;

    default:
      license = licenseButton('#28a745', spdxID); // Green color
      break;
  }




  return (
      <li key={repo.id.toString()} className={'list-group-item'}>
        <div className={'d-flex justify-content-between align-items-center'}>
          <div className={'d-flex flex-column'}>
            <a className={'h5 mb-0 text-decoration-none text-primary'} href={`${repo.url}`}>
              <i style={{color: '#bc670f'}}>{repo.name}</i></a>
            <p className={'small'}>
              {repo.description}
            </p>
          </div>
          <div className={"text-nowrap ms-3 "}>
            {repo.licenseInfo?.spdxId}
          <span className={
          "px-1 py-1 d-inline-block btn btn-sm " +
          (repo.viewerSubscription === "SUBSCRIBED" ? "btn-success" : "btn-outline-success")
            }>
              {repo.viewerSubscription}
            </span>
          </div>


        </div>

      </li>

  )
}

export default RepoInfo;