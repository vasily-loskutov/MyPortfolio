import { InfoService } from "../../../service/info.service";
import ProjectCard from "./projectCard";
import styles from "./projectPage.module.scss";
import { useQuery } from "react-query";
const Projects = () => {
  const { data: projects, isLoading } = useQuery(
    "getProjects",
    InfoService.getProjectInfo
  );
  console.log(projects);
  if (isLoading) return "Loading";
  return (
    <div className={styles.projectsPage}>
      <div className={styles.projectsBlock}>
        <h1 className="sectionTitle text-center">Projects</h1>
        <div className={styles.projectsContainer}>
          {projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
