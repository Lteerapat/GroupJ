import '../Styles/Achievement.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import trophy from "../Images/Achievement/trophy.png";
import bgachievement from "../Images/Achievement/bg-achievement.png";
function Achievement() {
  
  return (
    <div style={{ backgroundImage:`url(${bgachievement})`}} id="container">
      <div className="box">
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
        <div className="boxr1">
          <article className="card card1">
            <a href="#">
              <figure className="card-thumb">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content">
                <h2 className="card-title">First Challenge</h2>
              </div>
            </a>
          </article>
          <article className="card card2">
            <a href="#">
              <figure className="card-thumb">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content">
                <h2 className="card-title">5 Quests Done</h2>
              </div>
            </a>
          </article>
          <article className="card card3">
            <a href="#">
              <figure className="card-thumb">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content">
                <h2 className="card-title">5 Quests Done</h2>
              </div>
            </a>
          </article>
        </div>
        
        <div className="boxr2">
          <article className="card card4">
            <a href="#">
              <figure className="card-thumb">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content">
                <h2 className="card-title">7 Quests Done</h2>
              </div>
            </a>
          </article>
          <article className="card card5">
            <a href="#">
              <figure className="card-thumb">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content">
                <h2 className="card-title">10 Quests Done</h2>
              </div>
            </a>
          </article>
          <article className="card card6">
            <a href="#">
              <figure className="card-thumb">
                <img src={trophy} alt="trophy" />
              </figure>
              <div className="card-content">
                <h2 className="card-title">15 Quests Done</h2>
              </div>
            </a>
          </article>
        </div>
      </div>
    )
  }
  
  export default Achievement