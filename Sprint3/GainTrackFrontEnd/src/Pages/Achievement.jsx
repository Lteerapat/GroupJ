import '../Styles/Achievement.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import trophy from "../Images/Achievement/trophy.png";
import bgachievement from "../Images/Achievement/bg-achievement.png";
import { useEffect, useState } from 'react';
import axios from 'axios';


function Achievement() {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        axios.get('/achievements')
            .then(({data}) => {
                setAchievements(data)
            })
            .catch (() => {
                console.log('Error retrieving achievements')
            })
    }, []);

    return (
        <div style={{ backgroundImage:`url(${bgachievement})`}} id="container_achievement_pg">
        <div className="box_achievement_pg">
            <a href="/dashboard">
            <i className="fa-solid fa-house fa-2xl" style={{color: "#ffffff",}}></i>
            </a>
            <h1>Achievements</h1>
            <main>
                <Cards achievements={achievements} />
            </main>
        </div>
        </div>
    )
}

function Cards({achievements}) {

    const maxAchievements = 11;
  
    return (
      <div>
        <div className="boxr1_achievement_pg">
            {achievements.slice().map((achievement, index) => (
                <article
                    className='card_achievement_pg'
                    key={achievement.title}
                >
                    <a href="#">
                        <figure className="card-thumb_achievement_pg">
                        <img src={trophy} alt="trophy" />
                        </figure>
                        <div className="card-content_achievement_pg">
                        <h2 className="card-title_achievement_pg">{achievement.title}</h2>
                        </div>
                    </a>
                </article>
            ))}
            
        </div>
      </div>
    )
  }
  
  export default Achievement