import './Cards.css';
import trophy from "../assets/trophy.png"
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
  
  export default Cards
