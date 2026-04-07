import "./Goals.css";
import Shorterm from "../../../assets/Shorterm.png";
import Midterm from "../../../assets/Midterm.png";
import Longterm from "../../../assets/Longterm.png";
import {MdRocketLaunch,MdTimeline,MdMyLocation,} from "react-icons/md";

const Goals = () => {
  return (
    <>
      {/* Short-Term Goal */}
      <div className="Goals short-term">
        <img src={Shorterm} alt="Short Term Goal" className="Goals__image" />
        <div className="Goals__content">
          <div className="flex flex-col gap-4 text-white">
            {/* <div className="flex items-center gap-2"> */}
              <MdRocketLaunch />
              <p className="Goals__heading">Short-Term Goal</p>
           
            <p className="Goals__description">
             I aim to actively participate in hackathons to challenge myself with real-world problems and collaborate with diverse teams. These experiences will not only boost my problem-solving skills but also expose me to new tools and technologies.
            </p>
          </div>
        {/* </div> */}
      </div>
 </div>
      {/* Mid-Term Goal */}
      <div className="Goals mid-term">
        <img src={Midterm} alt="Mid Term Goal" className="Goals__image" />
        <div className="Goals__content">
          <div className="flex flex-col gap-4 text-white">
            <div className="flex items-center gap-2">
              <MdTimeline className="text-[rgba(45,212,191,1)]" size={28} />
              <p className="Goals__heading">Mid-Term Goal</p>
            </div>
            <p className="Goals__description">
              I'm focused on building impactful projects and securing internships that offer real-world exposure. These experiences will help me sharpen my skills, adapt to team workflows, and grow through mentorship and practical challenges.
            </p>
          </div>
        </div>
      </div>

      {/* Long-Term Goal */}
      <div className="Goals long-term">
        <img src={Longterm} alt="Long Term Goal" className="Goals__image" />
        <div className="Goals__content">
          <div className="flex flex-col gap-4 text-white">
            <div className="flex items-center gap-2">
              <MdMyLocation className="text-[rgba(45,212,191,1)]" size={28} />
              <p className="Goals__heading">Long-Term Goal</p>
            </div>
            <p className="Goals__description">
            My long-term vision to evolve into a top-performing software engineer who not only drives high-impact solutions but also shapes the future of tech through open-source, thought leadership, and a strong culture of mentorship.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Goals;