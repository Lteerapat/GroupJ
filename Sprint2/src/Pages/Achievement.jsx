import '../Styles/Achievement.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import trophy from "../Images/Achievement/trophy.png";
import bgachievement from "../Images/Achievement/bg-achievement.png";
function Achievement() {
  
  return (
    <div style={{ backgroundImage:`url(${bgachievement})`}} id="container_achievement_pg">
      <div className="box_achievement_pg">
        <a href="/dashboard">
        <i className="fa-solid fa-house fa-2xl" style={{color: "#ffffff",}}></i>
        </a>
        <h1>Achievement/Quests</h1>
        <main>
          <Cards/>
        </main>
      </div>
    </div>
  )
}

function Cards() {
  
    return (
      <div>
        <div className="boxr1_achievement_pg">
          <article className="card_achievement_pg card1_achievement_pg">
            <a href="#">
              <figure className="card-thumb_achievement_pg">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content_achievement_pg">
                <h2 className="card-title_achievement_pg">First Challenge</h2>
              </div>
            </a>
          </article>
          <article className="card_achievement_pg card2_achievement_pg">
            <a href="#">
              <figure className="card-thumb_achievement_pg">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content_achievement_pg">
                <h2 className="card-title_achievement_pg">5 Quests Done</h2>
              </div>
            </a>
          </article>
          <article className="card_achievement_pg card3_achievement_pg">
            <a href="#">
              <figure className="card-thumb_achievement_pg">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content_achievement_pg">
                <h2 className="card-title_achievement_pg">5 Quests Done</h2>
              </div>
            </a>
          </article>
        </div>
        
        <div className="boxr2_achievement_pg">
          <article className="card_achievement_pg card4_achievement_pg">
            <a href="#">
              <figure className="card-thumb_achievement_pg">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content_achievement_pg">
                <h2 className="card-title_achievement_pg">7 Quests Done</h2>
              </div>
            </a>
          </article>
          <article className="card_achievement_pg card5_achievement_pg">
            <a href="#">
              <figure className="card-thumb_achievement_pg">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content_achievement_pg">
                <h2 className="card-title_achievement_pg">10 Quests Done</h2>
              </div>
            </a>
          </article>
          <article className="card_achievement_pg card6_achievement_pg">
            <a href="#">
              <figure className="card-thumb_achievement_pg">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content_achievement_pg">
                <h2 className="card-title_achievement_pg">15 Quests Done</h2>
              </div>
            </a>
          </article>
        </div>
      </div>
    )
  }
  
  export default Achievement