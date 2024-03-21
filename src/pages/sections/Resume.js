// Images
import signature from '../../assets/images/signature2.png';

// Data
import resumeData from '../../data/resume.json';
// import { markdownToHTML } from '../../utils/converter';

// -------------

function Resume({userdata}) {
  
  return (
    <section id="resume" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            <div className="one-half width-55">
              <h2 className="entry-title section-title">
                {resumeData.experience.title}
              </h2>

              <ul className="timeline-holder">
                {userdata.map((exp, i) => (
                  <li key={'exp-' + i} className="timeline-event">
                    <span className="timeline-circle"></span>
                    <div
                      className="timeline-event-content"
                      // dangerouslySetInnerHTML={{
                      //   __html:'<i>'+new Date(exp.startDate).getFullYear()+' - '+ new Date(exp.endDate).getFullYear() +'</i>'+' ' +'<b>'+ exp.company_name + ' ' +'</b>'+exp.summary,
                      // }}
                      >
                        <div>
                        <b>{exp.company_name}</b>
                        </div>
                        <div style={{fontSize:'13px'}}>
                        <i>{'('+new Date(exp.startDate).getFullYear()}</i>-
                        <i>{new Date(exp.endDate).getFullYear()+')'}</i>
                        </div>
                        <div>
                        <p>{exp.summary}</p>
                        </div>
                      </div>
                    <div className="timeline-event-date">{new Date(exp.endDate).getFullYear()}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="one-half width-40 last">
              <h2 className="entry-title section-title">
                {resumeData.coverLetter.title}
              </h2>
              <p className="section-info">
                {resumeData.coverLetter.description}
              </p>
              {resumeData.coverLetter.paragraphes.map((parg, i) => (
                <p key={'parg-' + i}>{parg}</p>
              ))}

              <img className="my-signature" src={signature} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
