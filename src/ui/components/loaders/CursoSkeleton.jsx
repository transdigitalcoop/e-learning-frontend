import "../../../styles/CursoSkeleton.css";

const CursoSkeleton = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-curso">
        <div className="skeleton-img"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-description"></div>
        </div>
      </div>

      <div className="skeleton-progress">
        <div className="skeleton-progress-bar"></div>
        <div className="skeleton-progress-text"></div>
      </div>

      <div className="skeleton-modules">
        <div className="skeleton-mod-title"></div>
        <ul className="skeleton-mod-list">
          {[...Array(4)].map((_, index) => (
            <li key={index} className="skeleton-mod-item"></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CursoSkeleton;
