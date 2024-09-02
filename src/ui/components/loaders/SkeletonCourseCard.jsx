import "../../../styles/SkeletonCourseCard.css"; // Importa el archivo CSS

const SkeletonCourseCard = () => {
  return (
    <div className="skeleton-course-container">
      <div className="skeleton-course-progress"></div>
      <div className="skeleton-course-header">
        <div className="skeleton-info">
          <div className="skeleton-course-icon"></div>
          <div className="skeleton-course-title"></div>
        </div>
        <div className="skeleton-button">
          <div className="skeleton-course-button"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCourseCard;
