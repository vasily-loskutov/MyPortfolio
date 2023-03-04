import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  console.log(project);
  return (
    <Link
      className="rounded-lg shadow-castom transition-all hover:shadow-sm"
      to={`/projects/${project.id}`}>
      <div className="rounded-lg">
        <div className="max-w-sm max-h-xs">
          <img
            src={`upload/${project.path}`}
            className="max-w-full max-h-full bg-center bg-cover object-cover rounded-lg"></img>
        </div>

        <h1 className="mt-4 ml-5 mb-6 font-DM-sans font-bold text-2xl">
          {project.name}
        </h1>
      </div>
    </Link>
  );
};

export default ProjectCard;
